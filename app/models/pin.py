from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

from .pintag import pin_tag
from .like import like
from .board import board_pin


class Pin(db.Model):
    __tablename__ = "pins"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    image_url = db.Column(db.String(2550), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(tz=timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(tz=timezone.utc),
        onupdate=lambda: datetime.now(tz=timezone.utc),
    )

    # many-to-many relationship
    tags = db.relationship("Tag", secondary=pin_tag, back_populates="pins")
    liked_by_users = db.relationship(
        "User", secondary=like, back_populates="liked_pins"
    )
    boards = db.relationship(
        "Board", secondary=board_pin, back_populates="pins"
    )
    liked_by_users = db.relationship(
        "User", secondary=like, back_populates="liked_pins"
    )

    # one-to-many relationship
    comments = db.relationship("Comment", back_populates="pin")
    user = db.relationship("User", back_populates="pins")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "user_username": self.user.username if self.user else None,
            "user_first_name": self.user.first_name if self.user else None,
            "user_profile_image_url": self.user.profile_image_url if self.user else None,
        }
