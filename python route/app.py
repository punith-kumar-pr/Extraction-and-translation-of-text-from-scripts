from googletrans import Translator
translator = Translator()


def translate_text(kannada_text,dest):
    english_text = translator.translate(kannada_text, src='kn', dest=dest).text
    return english_text

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/translate', methods=['GET'])
def translate():
    kannada_text = request.args.get('text')
    dest = request.args.get('ln')
    english_text = translate_text(kannada_text,dest)
    translation = {
        "text": kannada_text,
        "translation": english_text
    }
    return jsonify(translation)

if __name__ == '__main__':
    app.run(debug=True)
