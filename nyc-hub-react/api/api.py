import time
from app import create_app, db
from flask import Flask, request, jsonify
from models import Events, events_schema, Recommendations, recommendations_schema

app = create_app()

# This method fetches events from the Events table
#
# Parameters:
#   top_x: passed in as json value stringified this will restrict the return to just top_x number of events sorted by ranking
@app.route("/api/table/events", methods=["POST"], strict_slashes=False)
def get_events():
    # silent is True so it doesnt throw an exception but returns None if no json passed in
    request_data = request.get_json(silent=True)
    top_x_events = None
    if request_data:
        top_x_events = request_data['top_x'] if 'top_x' in request_data else None
    if top_x_events:
        # getting top x events ranked by ranking
        events = db.session.query(Events).order_by(Events.ranking.desc()).limit(top_x_events).all()
    else:
        # else get all events
        events = Events.query.all()
    results = events_schema.dump(events)

    return jsonify(results)

@app.route("/api/table/add_event", methods=["POST"], strict_slashes=False)
def add_event():
    request_data = request.get_json()
    new_event = Events()
    db.session.add(new_event)
    db.session.commit()
    return 'Done', 201

@app.route("/api/table/update_event", methods=["POST"], strict_slashes=False)
def update_event():
    events = Events.query.all()
    results = events_schema.dump(events)

    return jsonify(results)

@app.route("/api/table/delete_event")
def delete_event():
    request_data = request.get_json()
    event_to_del = Events.query.filter_by(name=request_data['name']).one()
    db.session.delete(event_to_del)
    db.session.commit()

    return 'Deleted', 201

# This method fetches recs from the Recommendations table
#
# Parameters:
#   top_x: passed in as json value stringified this will restrict the return to just top_x number of recs sorted by ranking
@app.route("/api/table/recommendations", methods=["POST"], strict_slashes=False)
def get_recommendations():
    # silent is True so it doesnt throw an exception but returns None if no json passed in
    request_data = request.get_json(silent=True)
    top_x_recs = None
    if request_data:
        top_x_recs = request_data['top_x'] if 'top_x' in request_data else None
    if top_x_recs:
        recs = db.session.query(Recommendations).order_by(Recommendations.ranking.desc()).limit(top_x_events).all()
    else:
        recs = Recommendations.query.all()
    results = recommendations_schema.dump(recs)

    return jsonify(results)

@app.route("/api/table/add_recommendation", methods=["POST"], strict_slashes=False)
def add_recommendation():
    recs = Recommendations.query.all()
    results = recommendations_schema.dump(recs)

    return jsonify(results)

@app.route("/api/table/update_recommendation", methods=["POST"], strict_slashes=False)
def update_recommendation():
    recs = Recommendations.query.all()
    results = recommendations_schema.dump(recs)

    return jsonify(results)

@app.route("/api/table/delete_recommendation", methods=["POST"], strict_slashes=False)
def delete_recommendation():
    request_data = request.get_json()
    rec_to_del = Recommendations.query.filter_by(name=request_data['name']).one()
    db.session.delete(rec_to_be_deleted)
    db.session.commit()

    return 'Deleted', 201
