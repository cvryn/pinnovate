from app.models import db, environment, SCHEMA, pin_tag
from sqlalchemy.sql import text


def seed_pintags():
    pin_tags = [
        {"pin_id": 2, "tag_id": 1},
        {"pin_id": 2, "tag_id": 2},
        {"pin_id": 2, "tag_id": 8},
        {"pin_id": 2, "tag_id": 10},
        {"pin_id": 3, "tag_id": 1},
        {"pin_id": 3, "tag_id": 10},
        {"pin_id": 4, "tag_id": 1},
        {"pin_id": 5, "tag_id": 1},
        {"pin_id": 7, "tag_id": 3},
        {"pin_id": 8, "tag_id": 3},
        {"pin_id": 9, "tag_id": 3},
    ]

    for entry in pin_tags:
        db.session.execute(pin_tag.insert().values(entry))

    db.session.commit()

def undo_pintags():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pin_tags RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM pin_tags"))

    db.session.commit()
