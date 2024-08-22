from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .like import like


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    bio = db.Column(db.String(255), nullable=True)
    profile_image_url = db.Column(db.String(255), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # one-to-many relationship
    boards = db.relationship("Board", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    pins = db.relationship("Pin", back_populates="user")

    # many-to-many relationship
    liked_pins = db.relationship("Pin", secondary=like, back_populates="liked_by_users")

    created_tags = db.relationship(
        "Tag", back_populates="user", foreign_keys="Tag.user_id"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "bio": self.bio,
            "profile_image_url": self.profile_image_url,
            "pin_in_board": (
                [pin.to_dict() for board in self.boards for pin in board.pins]
                if self.boards
                else None
            ),
            "liked_pins": (
                [pin.to_dict() for pin in self.liked_pins] if self.liked_pins else None
            ),
            "created_tags": (
                [tag.to_dict() for tag in self.created_tags]
                if self.created_tags
                else None
            ),
        }
