from .db import db, environment, SCHEMA, add_prefix_for_prod


board_pin = db.Table(
    "board_pins",
    db.Column(
        "pin_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("pins.id")),
        primary_key=True,
    ),
    db.Column(
        "board_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("boards.id")),
        primary_key=True,
    ),
)

if environment == "production":
    board_pin.schema = SCHEMA
