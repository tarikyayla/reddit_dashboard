# Kurulum

Not : Python 3.6.5 sürümü için geçerlidir.( YÜKLERKEN PATH'e ekleme seçeneğini işaretlemeyi unutma!)

Projeyi indirdikten sonra klasöre git, komut satırını aç ve sırasıyla

```sh
$ pip install virtualenv --user 
$ virtualenv venv 
$ venv\Scripts\activate
$ pip install -r requirements.txt # Gerekli kütüphaneleri yükler.
$ python manage.py collectstatic # static dosyalarını toplar
$ python manage.py runserver # Sunucuyu ayağa kaldırır. 
```

Başka bir konsol ekranında 
```sh
$ cd frontend # frontend klasörüne gel
$ npm install 
$ npm start # localhost:3000 den çalışıcak, arayüz.
```



