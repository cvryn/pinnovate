from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_comments():
    demo_comment = Comment(
        user_id=1,
        pin_id=2,
        comment="Cool Demo Pin",
    )

    feijai_snowie_box = Comment(
        user_id=2,
        pin_id = 4,
        comment="Great idea! :3"
    )

    feijai_nightmare_box = Comment(
        user_id=2,
        pin_id = 5,
        comment="I have the same box! :3"
    )



    snowie_feijai_grass = Comment(
        user_id=3,
        pin_id = 2,
        comment="Inspo for my next adventure!"
    )

    snowie_bear_yawn = Comment(
        user_id=3,
        pin_id = 6,
        comment="That looks comfy, I'm going to DIY one!"
    )

    db.session.add_all([demo_comment])

    # cats, boxes
    db.session.add_all([feijai_snowie_box, feijai_nightmare_box, snowie_feijai_grass, snowie_bear_yawn])

    # foods and snacks
    db.session.add_all([])

    db.session.commit()





def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
