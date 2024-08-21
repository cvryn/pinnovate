from .db import db, environment, SCHEMA, add_prefix_for_prod


like = db.Table(
    "likes",
    db.Column(
        "pin_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("pins.id")),
        primary_key=True,
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id")),
        primary_key=True,
    ),
)

if environment == "production":
   like.schema = SCHEMA
