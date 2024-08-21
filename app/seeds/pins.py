from app.models import db, environment, SCHEMA, Pin
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_pins():
    demo_pin = Pin(
        user_id=1,
        title="Demo Pin",
        description="This is a demo description for a demo pin.",
        image_url="https://pinnovate-files.s3.amazonaws.com/demo/demo-pin-image.jpg",
    )

    # cats, boxes
    feijai_grass = Pin(
        user_id=2,
        title="In the jungle",
        description="Exploring the jungle today",
        image_url="image_url of him in the grass",
    )

    feijai_box = Pin(
        user_id=2,
        title="Afternoon plans",
        description="Great ways to spend the afternoon",
        image_url="image_url",
    )

    snowie_box = Pin(
        user_id=3,
        title="Box time",
        description="Biggest box EVER",
        image_url="image_url in box",
    )

    nightmare_box = Pin(
        user_id=4,
        title="Box time",
        description="How to stay chillin' like a villain",
        image_url="image_url",
    )

    bear_yawn = Pin(
        user_id=5,
        title="zzz",
        description="kinda eepy",
        image_url="image_url",
    )

    # food
    ramen1 = Pin(
        user_id=2,
        title="Yum!",
        description="It's om nom nom time! :3",
        image_url="image_url",
    )

    ramen2 = Pin(
        user_id=3,
        title="ramen",
        description="ramen",
        image_url="image_url",
    )

    ramen3 = Pin(
        user_id=4,
        title="Time to eat!",
        description="New place in town!",
        image_url="image_url",
    )

    ramen4 = Pin(
        user_id=5,
        title="Ingredients for Ramen",
        description="pork broth, dried ramen noodles, eggs, enoki, green onions, chashu pork belly, soy sauce, sake, mirin, sugar, clove garlic",
        image_url="image_url",
    )

    db.session.add_all([demo_pin])

    # cats, boxes
    db.session.add_all([feijai_grass, feijai_box, snowie_box, nightmare_box, bear_yawn])

    # foods and snacks
    db.session.add_all([ramen1, ramen2, ramen3, ramen4])

    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
