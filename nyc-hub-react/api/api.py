import time
from app import create_app, db
from flask import Flask, request, jsonify
from models import Events, events_schema, Recommendations, recommendations_schema

app = create_app()

# This method fetches events from the Events table
# GET because it gets data and want it to cache
#
# Parameters:
#   top_x: (Optional) passed in as json value stringified this will restrict the return to just top_x number of events sorted by ranking
@app.route("/api/table/events", methods=["GET"], strict_slashes=False)
def get_events():
    top_x_events = request.args.get('top_x', default = None, type = int)
    if top_x_events:
        # getting top x events ranked by ranking
        events = db.session.query(Events).order_by(Events.ranking.desc()).limit(top_x_events).all()
    else:
        # else get all events
        events = Events.query.all()
    results = events_schema.dump(events)

    return jsonify(results)

# This method adds events to the Events table
#
# Parameters:
#   name: passed in as a string this is the events new name
#   ranking: (Optional) passed in as a float this is the events ranking w default val 5
#   time: (Optional) passed in as an int this is the events time w default time currtime in EST
#   latitude: (Optional) passed in as a float his is the events lat w default lat my house
#   longitude: (Optional) passed in as a float this is the events long w default long my house
#   description: (Optional) passed in as text this is the events description
#   tags: (Optional) passed in as json value stringified this is the events tags used to classify and filter events
#
# TODO: check all inputs and format them correctly
@app.route("/api/table/add_event", methods=["POST"], strict_slashes=False)
def add_event():
    request_data = request.get_json(silent=True)
    new_event = Events(
        # name is key so fail if no name provided
        name = request_data['name'],
        # if no ranking provided pass None use default from model
        ranking = request_data['ranking'] if 'ranking' in request_data else None,
        time = request_data['time'] if 'time' in request_data else None,
        latitude = request_data['latitude'] if 'latitude' in request_data else None,
        longitude = request_data['longitude'] if 'longitude' in request_data else None,
        description = request_data['description'] if 'description' in request_data else '',
        # adding tag untagged if no tags passed in
        tags = request_data['tags'] if 'tags' in request_data else "{'tags': ['untagged']}"
    )
    db.session.add(new_event)
    db.session.commit()
    return 'Done', 201

# This method updates an event in the Events table
#
# Parameters:
#   old_name: Passing in old name so we can fetch the right row from the table (used as key)
#   new_name: (Optional) passed in as a string this is the events new name
#   ranking: (Optional) passed in as a float this is the events ranking w default val 5
#   time: (Optional) passed in as an int this is the events time w default time currtime in EST
#   latitude: (Optional) passed in as a float his is the events lat w default lat my house
#   longitude: (Optional) passed in as a float this is the events long w default long my house
#   description: (Optional) passed in as text this is the events description
#   tags: (Optional) passed in as json value stringified this is the events tags used to classify and filter events
#
# TODO: check all inputs and format them correctly
@app.route("/api/table/update_event", methods=["POST"], strict_slashes=False)
def update_event():
    request_data = request.get_json(silent=True)
    event = Events.query.filter_by(name=request_data['old_name']).first()

    if not event:
        return 'No such event', 200

    if 'new_name' in request_data:
        event.name = request_data['new_name']
    if 'ranking' in request_data:
        event.ranking = request_data['ranking']
    if 'time' in request_data:
        event.time = request_data['time']
    if 'latitude' in request_data:
        event.latitude = request_data['latitude']
    if 'longitude' in request_data:
        event.longitude = request_data['longitude']
    if 'description' in request_data:
        event.description = request_data['description']
    if 'tags' in request_data:
        event.tags = request_data['tags']

    db.session.commit()
    return 'Done', 200

# This method deletes an event from the Events table
#
# Parameters:
#   name: passed in as string this will fetch the event to be deleted
@app.route("/api/table/delete_event", methods=["DELETE"], strict_slashes=False)
def delete_event():
    request_data = request.get_json()
    event_to_del = Events.query.filter_by(name=request_data['name']).one()
    db.session.delete(event_to_del)
    db.session.commit()

    return 'Deleted', 200

# This method fetches recs from the Recommendations table
# GET because it gets data and want it to cache
#
# Parameters:
#   top_x: (Optional) passed in as json value stringified this will restrict the return to just top_x number of recs sorted by ranking
@app.route("/api/table/recommendations", methods=["GET"], strict_slashes=False)
def get_recommendations():
    top_x_recs = request.args.get('top_x', default = None, type = int)
    if top_x_recs:
        recs = db.session.query(Recommendations).order_by(Recommendations.ranking.desc()).limit(top_x_events).all()
    else:
        recs = Recommendations.query.all()
    results = recommendations_schema.dump(recs)

    return jsonify(results)

# This method adds recs to the Recommendations table
#
# Parameters:
#   name: passed in as json value stringified this is the recs name
#   ranking: (Optional) passed in as a string this is the recs ranking w default val 5
#   visited: (Optional) passed in as a boolean this is if ive visited the rec w default as False
#   latitude: (Optional) passed in as a float this is the recs lat w default lat my house
#   longitude: (Optional) passed in as a float this is the recs long w default long my house
#   description: (Optional) passed in as text this is the recs description
#   notes: (Optional) passed in as text these are notes ab the rec
#   tags: (Optional) passed in as json value stringified this is the recs tags used to classify and filter recs
#   links: (Optional) passed in as json value stringified this is the recs links used to hyperlink out for more info
# TODO: ERROR it allows duplicate keys for some reason (add React.StrictMode in index.js to test in dev)
@app.route("/api/table/add_recommendation", methods=["POST"], strict_slashes=False)
def add_recommendation():
    request_data = request.get_json(silent=True)
    new_rec = Recommendations(
        # name is key so fail if no name provided
        name = request_data['name'],
        # if no ranking provided pass None use default from model
        ranking = request_data['ranking'] if 'ranking' in request_data else None,
        visited = request_data['visited'] if 'visited' in request_data else None,
        latitude = request_data['latitude'] if 'latitude' in request_data else None,
        longitude = request_data['longitude'] if 'longitude' in request_data else None,
        description = request_data['description'] if 'description' in request_data else '',
        notes = request_data['notes'] if 'notes' in request_data else '',
        # adding tag untagged if no tags passed in
        tags = request_data['tags'] if 'tags' in request_data else "{'tags': ['untagged']}",
        links = request_data['links'] if 'links' in request_data else None
    )
    db.session.add(new_rec)
    db.session.commit()
    return 'Done', 201


# This method updates a rec in the Recommendations table
#
# Parameters:
#   old_name: Passing in old name so we can fetch the right row from the table (used as key)
#   new_name: (Optional) passed in as json value stringified this is the recs name
#   ranking: (Optional) passed in as a string this is the recs ranking w default val 5
#   visited: (Optional) passed in as a boolean this is if ive visited the rec w default as False
#   latitude: (Optional) passed in as a float this is the recs lat w default lat my house
#   longitude: (Optional) passed in as a float this is the recs long w default long my house
#   description: (Optional) passed in as text this is the recs description
#   notes: (Optional) passed in as text these are notes ab the rec
#   tags: (Optional) passed in as json value stringified this is the recs tags used to classify and filter recs
#   links: (Optional) passed in as json value stringified this is the recs links used to hyperlink out for more info
#
# TODO: check all inputs and format them correctly
@app.route("/api/table/update_recommendation", methods=["POST"], strict_slashes=False)
def update_recommendation():
    request_data = request.get_json(silent=True)
    rec = Recommendations.query.filter_by(name=request_data['old_name']).with_for_update(nowait=True).first()

    if not rec:
        return 'No such recommendation', 200

    if 'new_name' in request_data:
        rec.name = request_data['new_name']
    if 'ranking' in request_data:
        rec.ranking = request_data['ranking']
    if 'visited' in request_data:
        rec.visited = request_data['visited']
    if 'latitude' in request_data:
        rec.latitude = request_data['latitude']
    if 'longitude' in request_data:
        rec.longitude = request_data['longitude']
    if 'description' in request_data:
        rec.description = request_data['description']
    if 'notes' in request_data:
        rec.notes = request_data['notes']
    if 'tags' in request_data:
        rec.tags = request_data['tags']
    if 'links' in request_data:
        rec.links = request_data['links']

    db.session.commit()
    return 'Done', 200

# This method deletes a rec from the Recommendations table
#
# Parameters:
#   name: passed in as string this will fetch the rec to be deleted
@app.route("/api/table/delete_recommendation", methods=["DELETE"], strict_slashes=False)
def delete_recommendation():
    request_data = request.get_json()
    rec_to_del = Recommendations.query.filter_by(name=request_data['name']).one()
    db.session.delete(rec_to_del)
    db.session.commit()

    return 'Deleted', 200
