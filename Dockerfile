FROM python:3.6

ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev
ENV DOCKER_CONTAINER 1

COPY requirements.txt /code/requirements.txt
RUN pip install -r /code/requirements.txt
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs

COPY . /code/
WORKDIR /code/frontend
RUN npm install
RUN npm run-script build
WORKDIR /code/

EXPOSE 8000
