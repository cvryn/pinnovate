from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        first_name="Demo",
        last_name="User",
        bio="Just a demo user demoing.",
        profile_image_url="https://pinnovate-files.s3.amazonaws.com/demo/demo-user-profile-pic.jpg",
        password="password",
    )
    feijai = User(
        username="Feijai",
        email="feijai@aa.io",
        first_name="Fei",
        last_name="Jai",
        bio="Just a kitty in a kitty world :3",
        profile_image_url="profile_pic_url",
        password="password",
    )
    snowie = User(
        username="Snowie",
        email="snowie@aa.io",
        first_name="Snowie",
        last_name="Menace",
        bio="They call me Lil Menace,'cause I'm a lil menace >:3",
        profile_image_url="profile_pic_url",
        password="password",
    )

    nightmare = User(
        username="Nightmare",
        email="nightmare@aa.io",
        first_name="Nightmare",
        last_name="Bear",
        bio="I like gardens.",
        profile_image_url="profile_pic_url",
        password="password",
    )

    bear = User(
        username="Bear",
        email="bear@aa.io",
        first_name="Bear",
        last_name="Bear",
        bio="Climbing is my passion",
        profile_image_url="profile_pic_url",
        password="password",
    )

    mama = User(
        username="Mama",
        email="mama@aa.io",
        first_name="Mama",
        last_name="Cat",
        bio="Single mother of 3, spending my retirement looking for DIYs to decorate the house",
        profile_image_url="profile_pic_url",
        password="password",
    )

    db.session.add_all(
        [
            demo, feijai, snowie, nightmare, bear, mama
        ]
    )


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
