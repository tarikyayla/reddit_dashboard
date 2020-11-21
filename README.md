# 

Not : Python 3.6.5 sürümü için geçerlidir.( YÜKLERKEN PATH'e ekleme seçeneğini işaretlemeyi unutma!)

Not 2 : Artık docker desteği var! 

``` 
$ # Proje klasöründeyken
$ docker-compose up --build # Running every services! 
```

Projeyi indirdikten sonra klasöre git, komut satırını aç ve sırasıyla




```sh
$ pip install virtualenv --user 
$ virtualenv venv 
$ venv\Scripts\activate
$ pip install -r requirements.txt # Gerekli kütüphaneleri yükler.
$ python manage.py collectstatic # static dosyalarını toplar
$ python manage.py runserver # Sunucuyu ayağa kaldırır. 
$ python manage.py run_bot # running bot 
$ celery -A reddit_dashboard beat -l info # celery beat
$ celery -A reddit_dashboard worker -l info # celery worker
```

Başka bir konsol ekranında 
```sh
$ cd frontend # frontend klasörüne gel
$ npm install 
$ npm build 
$ npm start # localhost:3000 den çalışıcak, arayüz.
```



