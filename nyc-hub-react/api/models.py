from app import db,ma
from datetime import datetime, timezone, timedelta

class Events(db.Model):
    name = db.Column(db.String(200), primary_key=True)
    time = db.Column(db.Float(), default=datetime.now(timezone(timedelta(hours=-5), 'EST')), nullable=True)
    latitude = db.Column(db.Float(), nullable=False, default=40.745572971436594)
    longitude = db.Column(db.Float(), nullable=False, default=-73.98987275938163)
    description = db.Column(db.Text(), nullable=True)
    # store tags in json.dump as text
    tags = db.Column(db.Text(), nullable=True)

    def __repr__(self):
        return "Event %r" % self.name

#generating marshmallow schema from model
class EventsSchema(ma.Schema):
    class Meta:
        fields = ("name", "time", "latitude", "longitude", "description", "tags")

event_schema = EventsSchema()
events_schema = EventsSchema(many=True)
