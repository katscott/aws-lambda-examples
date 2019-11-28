from .handler import run


def test_handler_no_name():
    resp = run({}, None)
    assert resp == {'message': 'Greetings!'}


def test_handler_with_name():
    testName = 'Prostetnic Vogon Jeltz'
    resp = run({'name': testName}, None)
    assert resp == {'message': f'Greetings {testName}!'}
