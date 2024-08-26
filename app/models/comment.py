from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    pin_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")), nullable=False
    )
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(tz=timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(tz=timezone.utc),
        onupdate=lambda: datetime.now(tz=timezone.utc),
    )

    # one-to-many relationship
    user = db.relationship("User", back_populates="comments")
    pin = db.relationship("Pin", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'pin_id': self.pin_id,
            "comment": self.comment,
            "created_at": self.created_at,
            "user": {
                "id": self.user.id,
                "username": self.user.username,
                "first_name": self.user.first_name,
                "last_name": self.user.last_name,
                "profile_image_url": self.user.profile_image_url,
            } if self.user else None,
        }
