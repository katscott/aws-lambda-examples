from flask_cors import CORS
from flask import (
    Blueprint,
)
import os

from hello_api import defaults
from hello_api.routes.greet import ns as greet_namespace
from hello_api.api import api


def configure_app(flask_app):
    if flask_app.debug:
        CORS(flask_app, resources={r"/*": {"origins": "*"}})
    else:
        CORS(flask_app)

    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = defaults.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = defaults.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = defaults.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = defaults.RESTPLUS_ERROR_404_HELP


def health():
    return 'OK'


def initialize_app(flask_app):
    configure_app(flask_app)

    flask_app.add_url_rule('/health', view_func=health)

    blueprint = Blueprint('greetbp', __name__)
    api.init_app(blueprint)
    api.add_namespace(greet_namespace)
    flask_app.register_blueprint(blueprint)
