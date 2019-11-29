from flask_restplus import Api
from hello_api import defaults


api = Api(version='1.0',
          title='Hello world API',
          description='Greetings API',
          doc='/docs/')


@api.errorhandler
def default_error_handler(e):
    message = 'An unhandled exception occurred.'

    return {'message': message}, 500
