# Multilingual Text Extraction and Translation Web Application

This web application is designed to extract text from images/scripts in various languages and provide translations into multiple target languages. It utilizes the Node.js runtime environment along with Express.js for server-side handling, MongoDB for data storage, EJS for dynamic HTML rendering, and Tesseract for optical character recognition (OCR) to extract text from images/scripts.

---

## Features

- **Text Extraction**: The application uses Tesseract, an OCR engine, to extract text from images and scripts provided by the user.

- **Translation**: Once the text is extracted, the application leverages translation APIs or services to translate the extracted text into various target languages chosen by the user.

- **Supported Languages**: The application supports multiple languages for both text extraction and translation, making it versatile for global users.

- **Database Storage**: MongoDB is used to store user preferences, translation history, and other relevant data securely.

## Tech Stack

- **Node.js**: The application is built on the Node.js runtime environment, allowing efficient and scalable server-side scripting.

- **Express.js**: Express.js is utilized to create a robust and flexible web server that handles routing, middleware, and request handling.

- **MongoDB**: MongoDB is chosen as the database to store user data, translation history, and other essential information securely.

- **EJS**: EJS (Embedded JavaScript) templates are used to dynamically render HTML pages on the server side, making the user interface responsive and interactive.

- **Tesseract**: Tesseract is an OCR engine that enables the application to extract text from images and scripts in various languages.

## Getting Started

1. **Prerequisites**: Make sure you have Node.js and MongoDB installed on your machine.

2. **Clone the Repository**: Clone this repository to your local machine using `git clone https://github.com/punith-kumar-pr/Extraction-and-translation-of-text-from-scripts.git`.

3. **Install Dependencies**: Navigate to the project directory and run `npm install` to install the necessary dependencies.

4. **Configure MongoDB**: Make sure you have a running instance of MongoDB. Update the MongoDB connection settings in the application's configuration files.

5. **API Keys**: Obtain API keys from the translation service provider (e.g., Google Cloud Translate, Microsoft Azure Translation, etc.) and update the configuration files.

6. **Run Translator server**: Here I used a python server to translate the text, run the python file which is inside the python route folder `python app.py`

8. **Run the Application**: Execute `npm start` to start the Node.js server.

9. **Access the Application**: Open a web browser and navigate to `http://localhost:3000` to access the application.

## Contributions

Contributions to this project are welcome! Feel free to fork the repository, make improvements, and submit pull requests. Please ensure that your code follows the established coding standards and includes appropriate documentation.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out to the project maintainers via email at `punithkumarpr03@gmail.com` or `punikumar2002@gmail.com` for any inquiries or support related to the application. We hope you find this application useful and versatile for your text extraction and translation needs!
