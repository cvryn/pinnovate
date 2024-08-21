from app.models import db, environment, SCHEMA, Pin
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_pins():
    demo_pin = Pin(
        title="Demo Pin",
        description="This is a demo description for a demo pin.",
        image_url="https://pinnovate-files.s3.amazonaws.com/demo/demo-pin-image.jpg",
    )

    # cats, boxes
    feijai_grass = Pin(
        title="In the jungle",
        description="Exploring the jungle today",
        image_url="image_url of him in the grass",
    )

    feijai_box= Pin(
        title="Afternoon plans",
        description="Great ways to spend the afternoon",
        image_url="image_url",
    )

    snowie_box = Pin(
        title="Box time",
        description="Biggest box EVER",
        image_url="image_url in box",
    )

    nightmare_box= Pin(
        title="Box time",
        description="How to stay chillin' like a villain",
        image_url="image_url",
    )

    bear_yawn= Pin(
        title="zzz",
        description="kinda eepy",
        image_url="image_url",
    )

    # food
    ramen1= Pin(
        title="Yum!",
        description="New place in town",
        image_url="image_url",
    )

    ramen2= Pin(
        title="ramen",
        description="ramen",
        image_url="image_url",
    )

    ramen3= Pin(
        title="Time to eat!",
        description="It's om nom nom time",
        image_url="image_url",
    )

    ramen4= Pin(
        title="Ingredients for Ramen",
        description="pork broth, dried ramen noodles, eggs, enoki, green onions, chashu pork belly, soy sauce, sake, mirin, sugar, clove garlic",
        image_url="image_url",
    )


    db.session.add_all([demo_pin])

    # cats, boxes
    db.session.add_all([feijai_grass, feijai_box, snowie_box, nightmare_box, bear_yawn])

    # foods and snacks
    db.session.add_all([])




def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
