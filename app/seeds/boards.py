from app.models import db, environment, SCHEMA, Board
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_boards():
    feijai_foods_board = Board(
        user_id=2,
        name="Yummy Noms!",
        board_image_url="board image url",
        private=False,
    )

    db.session.add_all(
        [feijai_foods_board]
    )

    db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
