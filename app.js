const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photos');

const app = express();

//connect db
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATES ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //url'deki datayı okumamızı sağlar
app.use(express.json()); //url'deki datayı json formatına dönüştürmeyi sağlar
app.use(fileUpload());

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  // res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

//add.ejs dosyası içinde form etiketinde action="/photos" kısmında yakalıyor
app.post('/photos', async (req, res) => {
  //console.log(req.files.image);
  //forma girilen veriler gönderildiğinde yeni photo objesi yaratıyor
  //await Photo.create(req.body);
  //res.redirect('/'); //req-res döngüsünün bitmesi için anasayfaya yönlendirme yapıyoruz

  const uploadDir = 'public/uploads';
  //existsSync dosyanın olup olm. kontrol eder
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  //__dirname var olan klasörün kendisini
  const uploadImage = req.files.image;
  const uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
