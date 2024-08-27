from app.models import db, environment, SCHEMA, Tag
from sqlalchemy.sql import text


def seed_tags():
    # Default Tags
    cats = Tag(name="cats", description="adorable little creatures!", default=True)

    dogs = Tag(name="dogs", description="everyone's best friend!", default=True)

    food = Tag(
        name="food",
        description="delicious and diverse culinary delights!",
        default=True,
    )
    boba = Tag(
        name="boba",
        description="tasty bubble tea with chewy tapioca pearls!",
        default=True,
    )
    coffee = Tag(
        name="coffee",
        description="rich and aromatic brews to start your day!",
        default=True,
    )
    plants = Tag(
        name="plants",
        description="green and thriving vegetation for every space!",
        default=True,
    )

    flowers = Tag(
        name="flowers",
        description="beautiful and colorful blooms to brighten any day!",
        default=True,
    )

    nature = Tag(
        name="nature",
        description="the natural world and its stunning landscapes!",
        default=True,
    )


    # User Created Tags
    kitties = Tag(
        name="kitties",
        description="cute and playful little kittens!",
        default=False,
        user_id=6,
    )

    outdoors = Tag(
        name="outdoors",
        description="explore the great outdoors and nature!",
        default=False,
        user_id=4,
    )

    box = Tag(name="box", description="so versatile", default=False, user_id=3)

    # Defaults
    db.session.add_all([cats, dogs, food, boba, coffee, plants, flowers, nature])

    # User Created
    db.session.add_all([kitties, outdoors, box])

    db.session.commit()


def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
