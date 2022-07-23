import time
from app import create_app
from flask import Flask, request, jsonify
from models import Events, events_schema, Recommendations, recommendations_schema

app = create_app()

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/all_events')
def get_all_events():
    return {'all_events': [1, 2, 3, 4]}

@app.route('/api/first_event')
def get_first_event():
    return {'first_event': {
        'name': "Test Event",
        "time": 1658007763,
        "lat": 123,
        "long": 345,
    }}

@app.route('/api/first_k_events')
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

@app.route("/api/table/events", methods=["GET"], strict_slashes=False)
def get_events():
    events = Events.query.all()
    results = events_schema.dump(events)

    return jsonify(results)

@app.route("/api/table/recommendations", methods=["GET"], strict_slashes=False)
def get_recommendations():
    recs = Recommendations.query.all()
    results = recommendations_schema.dump(recs)

    return jsonify(results)
