import os
from flask_restplus import (
    Api,
    Resource
)
from hello_api.api import api
from urllib.parse import unquote as urldecode

import hello_api.defaults as defaults


ns = api.namespace('greet', description='Greets!')

prefix = os.environ.get(
    "API_URL_PREFIX", defaults.API_URL_PREFIX)


@api.route(f'/{prefix}')
@api.route(f'/{prefix}/<string:name>', doc={'params': {'name': 'The name to greet'}})
class Greet(Resource):

    @api.doc(responses={200: 'OK'})
    def get(self, name=None):
        return {
            "message": f'Greetings{" "+urldecode(name) if name else ""}!'
        }
