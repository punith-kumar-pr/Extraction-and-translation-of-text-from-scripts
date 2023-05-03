const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const multer  = require('multer');
const fs = require('fs')
const mongoose = require('mongoose');

let newName;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, newName = (Date.now()+'-'+file.originalname));
  }
});

const upload = multer({ storage: storage });

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: String,
  contentType: String
});

const Image =  mongoose.model('Image', ImageSchema);


router.get('/', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'index.ejs'),{imgurl:null});
});

router.post('/', upload.single('image'), async(req, res, next) => {
  console.log("reached")
  const image = new Image();
  image.name = newName;
  image.contentType = req.file.mimetype;
  const data = await image.save()
  console.log(data);
  let imgurl = newName;
  res.render('index.ejs',{imgurl:imgurl})
});



module.exports = router;
