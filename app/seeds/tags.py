from app.models import db, environment, SCHEMA, Tag
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tags():
    cats = Tag(
        name='cats',
        description='adorable little creatures!'
    )

    kitties = Tag(
        name='kitties',
        description='cute and playful little kittens!'
    )
    food = Tag(
        name='food',
        description='delicious and diverse culinary delights!'
    )


    boba = Tag(
        name='boba',
        description='tasty bubble tea with chewy tapioca pearls!'
    )

    coffee = Tag(
        name='coffee',
        description='rich and aromatic brews to start your day!'
    )

    plants = Tag(
        name='plants',
        description='green and thriving vegetation for every space!'
    )

    flowers = Tag(
        name='flowers',
        description='beautiful and colorful blooms to brighten any day!'
    )

    outdoors = Tag(
        name='outdoors',
        description='explore the great outdoors and nature!'
    )

    nature = Tag(
        name='nature',
        description='the natural world and its stunning landscapes!'
    )

    box = Tag(
        name='box',
        description='so versatile'
    )




    db.session.add_all([cats, kitties, food, boba, coffee, plants, flowers, outdoors, nature, box])

    db.session.commit()




def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
