from flask import Flask
from hello_api import initialize_app

if __name__ == "__main__":
    flask_app = Flask(__name__)
    initialize_app(flask_app)
    flask_app.run(debug=True)
