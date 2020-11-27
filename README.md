<p align="center">
  <h1 align="center">Reddit Discord BOT</h1>
</p>

## What is that ?

Follow your subreddits from discord channel.



### Built With

##### Frontend
* [Semantic UI](https://react.semantic-ui.com/)
* [Redux](https://redux.js.org/)
* [Axios](https://www.npmjs.com/package/axios)
* [React Alert](https://www.npmjs.com/package/react-alert)
##### Backend
* [Django](https://djangoproject.com)
* [Restframework](https://www.django-rest-framework.org)




## Getting Started

### Prerequisites

* npm

  ```
  npm install npm@latest -g
  ```
   
* Docker ( Optional ) 
* Python 3.6.5+

### Installation

* Docker
```
docker-compose up --build
```

* Manual

1. Clone the repo
2. Change setting files. (/reddit_dashboard/settings.py) 
3. Run

```
pip install virtualenv --user
virtualenv venv
venv\Scripts\activate
cd frontend
yarn build
cd ..
pip install -r requirements.txt
python manage.py collectstatic 
python manage.py runserver 
python manage.py run_bot 
celery -A reddit_dashboard beat -l info 
celery -A reddit_dashboard worker -l info
```

<!-- USAGE EXAMPLES -->
## Usage

**How to use ?**

![](https://i.imgur.com/b8UrPpF.jpeg)

1 - **Login** with **redirect link**

![](https://i.imgur.com/skx2DLW.png)

2 - Click  **Add New Server** button to add new discord servers.

![](https://i.imgur.com/9f8HOuI.png)

3 - And let the bot get your text-channels.

![](https://imgur.com/8KU6YUp.png)

4 - Click **follow subreddit** dropdown and add subreddit to this text channel .
(Also you can search if you have many subreddits)
 
![](https://imgur.com/DAQEjwi.png)

5 - **EXAMPLE** 

![](https://imgur.com/KbJW4YG.png)

6 - Click **Subreddits** and you can see your **subreddits** list (stack) .

![](https://imgur.com/oEdD07j.png)

7 - You can search and add any subreddit to your subreddits stack from here .

![](https://imgur.com/2lvE2PT.png)


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Semantic UI](https://react.semantic-ui.com/)
* [Redux](https://redux.js.org/)
* [Axios](https://www.npmjs.com/package/axios)
* [React Alert](https://www.npmjs.com/package/react-alert)

