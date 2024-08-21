from app.models import db, environment, SCHEMA, Pin
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_pins():
    demo_pin = Pin(
        title="Demo Pin",
        description="This is a demo description for a demo pin.",
        image_url="https://pinnovate-files.s3.amazonaws.com/demo/demo-pin-image.jpg",
    )
    feijai_pin = Pin(
        title="Feijai",
        description="This is a demo description for a demo pin.",
        image_url="image_url",
    )

    db.session.add_all([demo_pin, feijai_pin])


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
