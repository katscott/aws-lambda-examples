import os


def run(event, context):
    name = event.get('name')

    debug_env = os.environ.get("DEBUG", 'false')
    debug = debug_env.lower() == 'true'

    if(debug):
        print(event)

    return {
        'message': f'Greetings{" "+name if name else ""}!'
    }
