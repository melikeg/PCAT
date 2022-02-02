const express = require('express');
const path = require('path');

const app = express();

const myLogger = (req, res, next) => {
  console.log('MiddleWare log 1');
  next();
};

const myLogger2 = (req, res, next) => {
  console.log('MiddleWare log 2');
  next();
};

//MIDDLEWARE
app.use(express.static('public'));
app.use(myLogger);
app.use(myLogger2);

app.get('/', (req, res) => {
  //const photo = { id: 1, name: 'Photo Name', desc: 'Photo Desc.' };
  //res.send(photo);
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
