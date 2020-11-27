

<br />
<p align="center">
  <h1 align="center">Reddit Discord BOT</h3>


<details open="open">
  <summary>Table of Contents</summary>
  <ol>
      <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>




## What is that ?


Add your subreddits to your discord server !



### Built With


* [Semantic UI](https://react.semantic-ui.com/)
* [Redux](https://redux.js.org/)
* [Axios](https://www.npmjs.com/package/axios)
* [React Alert](https://www.npmjs.com/package/react-alert)





## Getting Started



### Prerequisites

* npm


  ```
  npm install npm@latest -g
  ```
  
 
* Docker
* Python 3.6.5

### Installation
Python 3.6.5 
Docker version is available now !

  

1. Clone the repo
2. Install NPM packages
```
npm install
```
3. Open Terminal and Run Services

* docker
```
docker-compose up --build
```
* Python 3.6.5 !!!

```
pip install virtualenv --user
virtualenv venv
venv\Scripts\activate
pip install -r requirements.txt # Install require libaries.
python manage.py collectstatic # Collect static files.
python manage.py runserver # Run server.
python manage.py run_bot # Running bot
celery -A reddit_dashboard beat -l info # celery beat
celery -A reddit_dashboard worker -l info # celery worker
```
```
cd frontend 
npm install
npm build
npm start # localhost:3000 
```

<!-- USAGE EXAMPLES -->
## Usage

**How to use ?**

![](https://i.imgur.com/b8UrPpF.jpeg)

1 - **Login** with **redirect link**

![](https://i.imgur.com/skx2DLW.png)

2 - Click  **Add New Server** button to add new discord servers.

![](https://i.imgur.com/9f8HOuI.png)

3 - Copy your **Text Channel ID** (from discord) and add **Text Channel** to this discord server.

![](https://i.imgur.com/cQtFmny.png)

4 - **EXAMPLE** List of **Discord Servers** and **Text Channels** 

![](https://imgur.com/8KU6YUp.png)

5 - Click **follow subreddit** dropdown and add subreddit to this text channel .
(Also you can search if you have many subreddits)
 
![](https://imgur.com/DAQEjwi.png)

5 - **EXAMPLE** 

![](https://imgur.com/KbJW4YG.png)

6 - Click **Subreddits** and you can see your **subreddits** list (stack) .

![](https://imgur.com/oEdD07j.png)

7 - You can search and add any subreddit to your subreddits stack from here .

![](https://imgur.com/2lvE2PT.png)


![product-screenshot]


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.







<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Semantic UI](https://react.semantic-ui.com/)
* [Redux](https://redux.js.org/)
* [Axios](https://www.npmjs.com/package/axios)
* [React Alert](https://www.npmjs.com/package/react-alert)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2

