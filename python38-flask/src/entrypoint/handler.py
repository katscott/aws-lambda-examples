import os
import awsgi
from flask import Flask

from hello_api import initialize_app


def run(event, context):
    flask_app = Flask(__name__)
    initialize_app(flask_app)

    debug_env = os.environ.get("DEBUG", 'false')
    debug = debug_env.lower() == 'true'

    if(debug):
        print(event)

    return awsgi.response(flask_app, event, context, base64_content_types={"image/png"})
