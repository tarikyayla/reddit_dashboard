from rest_framework.views import APIView
from rest_framework import generics, viewsets
from api.responses import SUCCESS_RESPONSE, FAIL_RESPONSE
from api.reddit.manager import reddit_manager
from api.serializers import StandardResultsSetPagination
from reddit_dashboard.models import DashboardUser, Subreddit
from reddit_dashboard import logger
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.serializers.reddit_serializers import SubredditSerializer
from django.http.response import HttpResponseNotFound
from rest_framework.decorators import action



class RedditAuth(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.reddit_user_id:
            return Response({
                "active": True,
                "user_id": user.reddit_user_id,
                "user_data": user.reddit_user_data,
                "username": user.reddit_username
            })

        redirect_url = reddit_manager.get_auth_link(request.user.username)

        return Response({
            "active": False,
            "redirect_link": redirect_url
        })


class RefreshSubreddits(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            subreddits = reddit_manager.get_user_subreddits(user=request.user)
            request.user.add_subreddits_to_user(subreddit_list=subreddits)
            return SUCCESS_RESPONSE
        except Exception as ex:
            logger.error(str(ex))
            return FAIL_RESPONSE(ex)


class Subreddits(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = SubredditSerializer

    def list(self, requests):
        queryset = requests.user.subreddits.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serialized_data = self.get_serializer(queryset, many=True)
        return Response(serialized_data.data)

    def retrieve(self, request, pk=None):
        if not pk:
            return HttpResponseNotFound()
        obj = Subreddit.objects.filter(pk=pk).first()
        if not obj:
            return HttpResponseNotFound()

        return Response(self.get_serializer(obj).data)

    def create(self, request):
        user = request.user
        subreddit_id = request.data["subreddit_id"]
        subreddit = Subreddit.objects.filter(pk=subreddit_id).first()

        if not subreddit:
            return FAIL_RESPONSE("Subreddit not exist")

        request.user.add_subreddit_obj_to_user(subreddit)
        return SUCCESS_RESPONSE

    def destroy(self, request, pk=None):
        user = request.user
        subreddit = Subreddit.objects.filter(pk=pk).first()

        if not subreddit:
            return FAIL_RESPONSE("Subreddit not exist")

        user.unfollow_subreddit(subreddit)
        return SUCCESS_RESPONSE


class SearchSubreddit(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = SubredditSerializer

    def get_queryset(self):
        search_text = self.request.query_params.get("text")
        if not search_text:
            return []

        results = reddit_manager.search_by_subreddit(search_text)

        for result in results:
            Subreddit.create(result, self.request.user)

        return Subreddit.objects.filter(name__startswith=search_text)





