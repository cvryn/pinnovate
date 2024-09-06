from .db import db, environment, SCHEMA, add_prefix_for_prod

from .boardpin import board_pin



class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    name = db.Column(db.String(50), nullable=False)
    board_image_url = db.Column(db.String(2550), nullable=True)
    private = db.Column(db.Boolean, nullable=True)

    # one-to-many relationship
    user = db.relationship("User", back_populates="boards")

    # many-to-many relationships
    pins = db.relationship(
        "Pin",
        secondary=board_pin,
        back_populates="boards"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            "board_image_url": self.board_image_url,
            "private": self.private,

        }
