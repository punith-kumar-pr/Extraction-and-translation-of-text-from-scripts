from googletrans import Translator
translator = Translator()

def translate_text(kannada_text):
    english_text = translator.translate(kannada_text, src='kn', dest='en').text
    return english_text

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/translate', methods=['GET'])
def translate():
    kannada_text = request.args.get('text')
    english_text = translate_text(kannada_text)
    translation = {
        "text": kannada_text,
        "translation": english_text
    }
    return jsonify(translation)

if __name__ == '__main__':
    app.run(debug=True)
