import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/all_events')
def get_all_events():
    return {'all_events': [1, 2, 3, 4]}

@app.route('/first_event')
def get_first_event():
    return {'first_event': {
        'name': "Test Event",
        "time": 1658007763,
        "lat": 123,
        "long": 345,
    }}

@app.route('/first_k_events')
def get_first_k_events():
    k = request.args.get('k')
    return {'first_k_events': [{
        'name': "Test Event",
        "time": 1658007763,
        "lat": 123,
        "long": 345,
    }, {
        'name': "Test Event 2",
        "time": 1758007763,
        "lat": 567,
        "long": 789,
    }]}
