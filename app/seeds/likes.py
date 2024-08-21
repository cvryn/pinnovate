from app.models import db, environment, SCHEMA, like
from sqlalchemy.sql import text


def seed_likes():
    likes = [
        {"user_id": 2, "pin_id": 10},
        {"user_id": 2, "pin_id": 9},
        {"user_id": 2, "pin_id": 8},
        {"user_id": 3, "pin_id": 1},
        {"user_id": 3, "pin_id": 2},

    ]

    for entry in likes:
        db.session.execute(like.insert().values(entry))

    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
