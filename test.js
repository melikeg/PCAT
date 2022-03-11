/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect db
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//*******************create schema*************

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);
/*
Photo.create({
  title: 'Photo Title 2',
  description: 'Photo description 2 Lorem Ipsum',
});
*/

//********************read a photo*********************
/*
Photo.find({}, (err, data) => {
  console.log(data);
});*/
//**************** updated data  ************* */
/* 
const id = '6218f8c8b2417d96af18ba0f';
Photo.findByIdAndUpdate(
  id,
  {
    title: 'Photo title 111 updated',
    description: 'Photo description 111 updated',
  },
  {
    new: true, //consolda da gücellenmiş halini gösterir
  },
  (err, data) => {
    console.log(data);
  }
);

//**********************delete a photo*********************

const id = '6218fae52ae3d477953956b7';

Photo.findByIdAndDelete(id, (err, data) => {
  console.log(`${data} is removed...`);
});
*/
