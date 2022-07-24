from app import db,ma
from datetime import datetime, timezone, timedelta
import enum
from sqlalchemy import Enum

class Events(db.Model):
    name = db.Column(db.String(200), primary_key=True)
    ranking = db.Column(db.Float(), nullable=True, default=5)
    time = db.Column(db.Float(), default=datetime.timestamp(datetime.now(timezone(timedelta(hours=-5), 'EST'))), nullable=True)
    latitude = db.Column(db.Float(), nullable=False, default=40.745572971436594)
    longitude = db.Column(db.Float(), nullable=False, default=-73.98987275938163)
    description = db.Column(db.Text(), nullable=True)
    # store tags in json.dump as text as {tags: [tag1, tag2]}
    tags = db.Column(db.Text(), nullable=True)

    def __repr__(self):
        return "Event %r" % self.name

#generating marshmallow schema from model
class EventsSchema(ma.Schema):
    class Meta:
        fields = ("name", "ranking", "time", "latitude", "longitude", "description", "tags")

event_schema = EventsSchema()
events_schema = EventsSchema(many=True)

class Recommendations(db.Model):
    name = db.Column(db.String(200), primary_key=True)
    ranking = db.Column(db.Float(), nullable=True, default=5)
    visited = db.Column(db.Boolean(), nullable=False, default=False)
    latitude = db.Column(db.Float(), nullable=False, default=40.745572971436594)
    longitude = db.Column(db.Float(), nullable=False, default=-73.98987275938163)
    description = db.Column(db.Text(), nullable=True)
    notes = db.Column(db.Text(), nullable=True)
    # store tags in json.dump as text {tags: [tag1, tag2]}
    tags = db.Column(db.Text(), nullable=True)
    # store links in json.dump as key:value pairs where the key is hyperlinked to the link value
    links = db.Column(db.Text(), nullable=True)


    def __repr__(self):
        return "Recommendation %r" % self.name

#generating marshmallow schema from model
class RecommendationsSchema(ma.Schema):
    class Meta:
        fields = ("name", "ranking", "visited", "latitude", "longitude", "description", "notes", "tags", "links")

recommendation_schema = RecommendationsSchema()
recommendations_schema = RecommendationsSchema(many=True)
