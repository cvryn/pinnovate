from .db import db, environment, SCHEMA, add_prefix_for_prod



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
    pin = db.relationship("Pin", back_populates="board")

    # many-to-many relationships
    pins = db.relationship(
        "Pin",
        secondary="board_pins",
        back_populates="boards"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            "private": self.private,

        }
