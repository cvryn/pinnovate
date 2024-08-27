from .db import db, environment, SCHEMA, add_prefix_for_prod

pin_tag = db.Table(
    "pin_tags",
    db.Column(
        "pin_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("pins.id")),
        primary_key=True,
    ),
    db.Column(
        "tag_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("tags.id")),
        primary_key=True,
    ),
)

if environment == "production":
    pin_tag.schema = SCHEMA
