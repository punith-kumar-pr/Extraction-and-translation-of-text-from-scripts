const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const multer  = require('multer');
const fs = require('fs')
const axios = require('axios');
const mongoose = require('mongoose');
const tesseract = require('node-tesseract-ocr')
const session = require('express-session')
// const {langcode} = require('./langs')



// console.log(req.query.langcode);
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

var extext;

router.get('/langs', (req, res) => {
    // Define the language labels and codes
    const languages = [
      { name: 'English', code: 'eng' },
      { name: 'Hindi', code: 'hin' },
      { name: 'Kannada', code: 'kan' },
      { name: 'Sanskrit', code: 'san' },
      { name: 'Autodetect', code: 'osd' },
      // Add more languages as needed
    ];
  
    // Render the view with the language data
    res.render('langs', { languages });
  });

    global.selectedLanguageCode = '';
  router.get('/langs/:code', (req, res) => {
      global.selectedLanguageCode = req.params.code;
      res.redirect('/');
    });

router.get('/', (req, res, next) => {
  res.render(path.join(rootDir, 'views', 'index.ejs'),{imgurl:null});
});

router.post('/', upload.single('image'), async(req, res, next) => {
//   console.log("reached")
  const image = new Image();
  image.name = newName;
  //   console.log(newName); // url is present here
  image.contentType = req.file.mimetype;
  const data = await image.save()
  console.log(data);
  let imgurl = newName;
  
  const img = req.file.path;
  console.log(img);

// TESSERACT
const lc = global.selectedLanguageCode;
console.log(lc);
const config = {
    lang: lc,
    oem: 1,
    psm: 3,
  };

//   const imageFilePath = path.join(__dirname, '..', img);
//   console.log(imageFilePath);
// const imgtotes = fs.readFileSync(img);
  try {
    const text = await tesseract.recognize(img, config);
    console.log(text);
    extext = text;
    res.render('index.ejs', { imgurl: imgurl, text: text });
  } catch (error) {
    console.error(error);
    res.render('index.ejs', { imgurl: imgurl, error: error });
  }
//  TESSERACT 
//   res.render('index.ejs',{imgurl:imgurl})
});


//translate.js route
// const kan_txt=`ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯು ಬ್ರಾಹ್ಮಿ ಲಿಪಿಯಿಂದ ಬೆಳೆದು ಬಂದಿದೆ. ಇದನ್ನು ಸ್ವರಗಳು, ಅನುಸ್ವಾರ, ವಿಸರ್ಗ, ವ್ಯಂಜನಗಳು, ಅವರ್ಗೀಯ ವ್ಯಂಜನಗಳೆಂದು ವಿಭಾಗಿಸಲಾಗಿದೆ. ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯನ್ನು ಕನ್ನಡ ವರ್ಣಮಾಲೆಯೆಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ನಾವು ಮಾತನಾಡುವ ಮಾತುಗಳೆಲ್ಲ ವಾಕ್ಯ
// ವಾಕ್ಯಗಳಾಗಿರುತ್ತವೆ.
// ವಾಕ್ಯಗಳು ಪದಗಳಿಂದ ಕೂಡಿರುತ್ತವೆ. ಪದಗಳು ಅಕ್ಷರಗಳಿಂದ ಕೂಡಿರುತ್ತವೆ. ಉದಾಹರಣೆಗೆ, ನಾನು ಶಾಲೆಗೆ ಹೋಗಿ
// ಬರುವೆನು. ಈ
// ವಾಕ್ಯದಲ್ಲಿ ನಾನು, ಶಾಲೆಗೆ, ಹೋಗಿ, ಬರುವೆನು, ಹೀಗೆ ನಾಲ್ಕು ಪದಗಳಿವೆ. ಒಂದೊಂದು ಪದದಲ್ಲೂ ಹಲವು
// ಅಕ್ಷರಗಳಿವೆ.`
router.get('/translate',(req,res,next)=>{
const url = `http://127.0.0.1:5000/translate?text=${extext}&ln=en`; // Example Kannada text
axios.get(url)
    .then(response => {
        console.log(response.data.translation); // Prints the translated text
        // req.obt_img = req.query.id;
        res.render('extracted.ejs',{kan_txt:extext ,eng_txt : response.data.translation, 
            img_url :req.query.id, lang:"English"});
    })
    .catch(error => {
        console.error(error);
    });
});


// MULTIPLE LANGUAGES

// HINDI
router.get('/translate/hi',(req,res,next)=>{
    const url = `http://127.0.0.1:5000/translate?text=${extext}&ln=hi`; // Example Kannada text
    axios.get(url)
        .then(response => {
            console.log(response.data.translation); // Prints the translated text
            res.render('extracted.ejs',{kan_txt:extext,eng_txt : response.data.translation, 
                img_url :req.query.id, lang:"Hindi"});
        })
        .catch(error => {
            console.error(error);
        });
    });

// MALAYALAM
router.get('/translate/ml',(req,res,next)=>{
    const url = `http://127.0.0.1:5000/translate?text=${extext}&ln=ml`; // Example Kannada text
    axios.get(url)
        .then(response => {
            console.log(response.data.translation); // Prints the translated text
            res.render('extracted.ejs',{kan_txt:extext,eng_txt : response.data.translation, 
                img_url :req.query.id, lang:"Malayalam"});
        })
        .catch(error => {
            console.error(error);
        });
    });

// SPANISH
router.get('/translate/es',(req,res,next)=>{
    const url = `http://127.0.0.1:5000/translate?text=${extext}&ln=es`; // Example Kannada text
    axios.get(url)
        .then(response => {
            console.log(response.data.translation); // Prints the translated text
            res.render('extracted.ejs',{kan_txt:extext,eng_txt : response.data.translation, 
                img_url :req.query.id, lang:"Spanish"});
        })
        .catch(error => {
            console.error(error);
        });
    });

// TAMIL
router.get('/translate/ta',(req,res,next)=>{
    const url = `http://127.0.0.1:5000/translate?text=${extext}&ln=ta`; // Example Kannada text
    axios.get(url)
        .then(response => {
            console.log(response.data.translation); // Prints the translated text
            res.render('extracted.ejs',{kan_txt:extext,eng_txt : response.data.translation, 
                img_url :req.query.id, lang:"Tamil"});
        })
        .catch(error => {
            console.error(error);
        });
    });

// TELUGU
router.get('/translate/te',(req,res,next)=>{
    const url = `http://127.0.0.1:5000/translate?text=${extext}&ln=te`; // Example Kannada text
    axios.get(url)
        .then(response => {
            console.log(response.data.translation); // Prints the translated text
            res.render('extracted.ejs',{kan_txt:extext,eng_txt : response.data.translation, 
                img_url :req.query.id, lang:"Telugu"});
        })
        .catch(error => {
            console.error(error);
        });
    }); 
//translate.js route endes


module.exports = router;
