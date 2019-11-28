from urllib.parse import quote as urlencode

from hello_api.routes.greet import Greet


def test_handler_no_name():
    greet = Greet()
    resp = greet.get()
    assert resp == {'message': 'Greetings!'}


def test_handler_with_name():
    testName = "Oolon Colluphid"
    encodedTestName = urlencode(testName)
    greet = Greet()
    resp = greet.get(encodedTestName)
    assert resp == {'message': f'Greetings {testName}!'}
