const axios = require('axios');
const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    let kan_txt=`ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯು ಬ್ರಾಹ್ಮಿ ಲಿಪಿಯಿಂದ ಬೆಳೆದು ಬಂದಿದೆ. ಇದನ್ನು ಸ್ವರಗಳು, ಅನುಸ್ವಾರ, ವಿಸರ್ಗ, ವ್ಯಂಜನಗಳು, ಅವರ್ಗೀಯ ವ್ಯಂಜನಗಳೆಂದು ವಿಭಾಗಿಸಲಾಗಿದೆ. ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆಯನ್ನು ಕನ್ನಡ ವರ್ಣಮಾಲೆಯೆಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ನಾವು ಮಾತನಾಡುವ ಮಾತುಗಳೆಲ್ಲ ವಾಕ್ಯ
    ವಾಕ್ಯಗಳಾಗಿರುತ್ತವೆ.
    ವಾಕ್ಯಗಳು ಪದಗಳಿಂದ ಕೂಡಿರುತ್ತವೆ. ಪದಗಳು ಅಕ್ಷರಗಳಿಂದ ಕೂಡಿರುತ್ತವೆ. ಉದಾಹರಣೆಗೆ, ನಾನು ಶಾಲೆಗೆ ಹೋಗಿ
    ಬರುವೆನು. ಈ
    ವಾಕ್ಯದಲ್ಲಿ ನಾನು, ಶಾಲೆಗೆ, ಹೋಗಿ, ಬರುವೆನು, ಹೀಗೆ ನಾಲ್ಕು ಪದಗಳಿವೆ. ಒಂದೊಂದು ಪದದಲ್ಲೂ ಹಲವು
    ಅಕ್ಷರಗಳಿವೆ.`
const url = `http://127.0.0.1:5000/translate?text=${kan_txt}`; // Example Kannada text
axios.get(url)
    .then(response => {
        console.log(response.data.translation); // Prints the translated text
        res.render('extracted.ejs',{kan_txt:kan_txt,eng_txt : response.data.translation, img_url :req.query.id});
    })
    .catch(error => {
        console.error(error);
    });
});

module.exports = router;