const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// const ejs = require('ejs')
const Tesseract = require('node-tesseract-ocr');


const app = express();


const homeRoute = require('./routes/home');
const aboutRoute = require('./routes/about');
const contactRoute = require('./routes/contact');
// const imgUploadRoute = require('./routes/uploadimg');
// const translateRoute = require('./routes/translate')
const mongoose = require('mongoose');
const dotenv = require('dotenv')


app.set('view engine', 'ejs');
app.set('views', 'views');


mongoose.connect('mongodb+srv://punith-kumar-pr:punith123@punith-cluster.c2shwte.mongodb.net/ocrdb+?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err);
  });

// Database connection ended

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // Render a form that accepts an image file
// app.get('/', (req, res) => {
//   res.render('form');
// });

// Render a form that accepts an image file
app.get('/form', (req, res) => {
  res.render('form');
});
 
// Handle form submission and extract text from image
app.post('/ocr', (req, res) => {
  const imageFile = req.files.image;
  
  Tesseract.recognize('a.jpg',{lang:'kan'})
    .then(text => {
      res.render('ocr', { text });
    })
    .catch(error => {
      console.error(error);
      res.render('error');
    });
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(express.json())
app.use(homeRoute);
app.use('/contact', contactRoute);
app.use('/about', aboutRoute);
// app.use('/translate', translateRoute);

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use((req, res, next) => {
    res.status(404).render(path.join(__dirname, 'views', '404.ejs'));
});

app.listen(3000, () => {
    console.log(`app is listening port 3000`)
});
