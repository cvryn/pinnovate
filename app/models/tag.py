from .db import db, environment, SCHEMA, add_prefix_for_prod
from .pintag import pin_tag


class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=False)
    default = db.Column(db.Boolean, default=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=True)

    # one-to-many relationship
    user = db.relationship('User', back_populates='created_tags')

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
            'user_id': self.user_id,
            'default': self.default
        }
