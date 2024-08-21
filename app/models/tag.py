from .db import db, environment, SCHEMA, add_prefix_for_prod
from .pintag import pin_tag


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2555), nullable=False)

    # many-to-many relationship
    pins = db.relationship(
        'Pin',
        secondary=pin_tag,
        back_populates='tags'
    )


    def to_dict(self):
        return {
            'id': self.id,
            "name": self.name,
            "description": self.description,
        }
