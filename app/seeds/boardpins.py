from app.models import db, environment, SCHEMA, board_pin
from sqlalchemy.sql import text


def seed_boardpins():
    board_pins = [
        {"board_id": 1, "pin_id": 9},
        {"board_id": 1, "pin_id": 10},
    ]

    for entry in board_pins:
        db.session.execute(board_pin.insert().values(entry))

    db.session.commit()

def undo_boardpins():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.board_pins RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM board_pins"))

    db.session.commit()
