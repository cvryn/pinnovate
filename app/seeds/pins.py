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
        image_url="https://pinnovate-files.s3.amazonaws.com/cats/fj_grass.jpg",
    )

    feijai_box = Pin(
        user_id=2,
        title="Afternoon plans",
        description="Great ways to spend the afternoon",
        image_url="https://pinnovate-files.s3.amazonaws.com/cats/fj_box.jpg",
    )

    snowie_box = Pin(
        user_id=3,
        title="Box time",
        description="Biggest box EVER",
        image_url="https://pinnovate-files.s3.amazonaws.com/cats/snowie_box.jpg",
    )

    nightmare_box = Pin(
        user_id=4,
        title="Box time",
        description="How to stay chillin' like a villain",
        image_url="https://pinnovate-files.s3.amazonaws.com/cats/nightmare_box.jpg",
    )

    bear_yawn = Pin(
        user_id=5,
        title="zzz",
        description="Just an eepy baby",
        image_url="https://pinnovate-files.s3.amazonaws.com/cats/bear_yawn_box.jpg",
    )

    # food
    ramen1 = Pin(
        user_id=2,
        title="Yum!",
        description="It's om nom nom time! :3",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/ramen1.jpg",
    )

    ramen2 = Pin(
        user_id=3,
        title="ramen",
        description="ramen",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/ramen2.jpg",
    )

    ramen3 = Pin(
        user_id=4,
        title="Time to eat!",
        description="New place in town!",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/ramen3.jpg",
    )

    ramen4 = Pin(
        user_id=5,
        title="Ingredients for Ramen",
        description="pork broth, dried ramen noodles, eggs, enoki, green onions, chashu pork belly, soy sauce, sake, mirin, sugar, clove garlic",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/ramen4.jpg",
    )

    hainan_chicken_rice = Pin(
        user_id=2,
        title="Chicken Rice Peanuts",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/hainan_chicken_rice.jpg",
    )

    burger = Pin(
        user_id=4,
        title="Burger",
        description="Top 10 Burger Places to Visit in the Bay Area",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/burger.jpg",
    )

    bear_icecream_shop = Pin(
        user_id=2,
        title="Cute Ice Cream Shops!",
        description="Top 10 Ice Cream Shops to Visit in the Bay Area",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/bear_icecream_shop.jpg",
    )
    bear_icecream_shop2 = Pin(
        user_id=2,
        title="Cute Ice Cream Shops!",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/food/bear_icecream_shop2.jpg",
    )

    # flowers
    rose1 = Pin(
        user_id=2,
        title="Spring Time",
        description="Rose Care Tips for a Lush Bloom",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/rose1.jpg",
    )

    rose2 = Pin(
        user_id=3,
        title="Roses in Bloom",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/rose2.jpg",
    )

    rose3 = Pin(
        user_id=4,
        title="Roses in Bloom",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/rose3.JPG",
    )

    rose3 = Pin(
        user_id=5,
        title="Roses in Bloom",
        description="Beautiful Rose Garden Inspirations",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/rose3.JPG",
    )

    rose4 = Pin(
        user_id=6,
        title="Spring",
        description="Brighten your space with colorful spring flowers! Find tips and inspiration for arranging and displaying these seasonal blooms.",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/rose4.jpg",
    )

    flower1 = Pin(
        user_id=2,
        title="Bright and Beautiful Flower Color Combinations",
        description="Brighten up your home with beautiful flower color combinations that create a lively and inviting atmosphere.",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/rose4.jpg",
    )
    flower2 = Pin(
        user_id=3,
        title="Inspiring Flower Garden Ideas",
        description="Get inspired with creative flower garden ideas that will help you design a vibrant and welcoming outdoor space.",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/flowers2.jpg",
    )

    flower3 = Pin(
        user_id=4,
        title="Spooky",
        description="Goth-eque flower ideas for the spoooooooky seasons!",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/flowers3.jpg",
    )

    flower5 = Pin(
        user_id=6,
        title="Spring",
        description="Spring",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/flowers5.jpg",
    )

    orchid1 = Pin(
        user_id=5,
        title="Beautiful Orchid Care Tips and Tricks",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/orchid1.jpg",
    )

    orchid2 = Pin(
        user_id=6,
        title="Orchid Flowering Patterns and Colors to Inspire",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/orchid2.jpg",
    )

    orchid3 = Pin(
        user_id=2,
        title="Unique and Rare Orchid Species to Discover",
        description="Explore a selection of stunning orchid varieties that will bring elegance and beauty to your home decor with their unique blooms.",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/orchids3.jpg",
    )

    orchid4 = Pin(
        user_id=4,
        title="Creating a Stunning Orchid Garden: A Visual Guide",
        description="Find creative DIY ideas for potting and displaying orchids to showcase their beauty and make a statement in your home.",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/orchids4.JPG",
    )

    orchid5 = Pin(
        user_id=3,
        title="Tips for Growing Gorgeous Orchids",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/orchids5.JPG",
    )

    tulips1 = Pin(
        user_id=3,
        title="Beautiful Tulip Varieties for Every Garden",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/tulips1.jpg",
    )
    tulips2 = Pin(
        user_id=2,
        title="Seasonal Tulip Trends to Try This Year",
        description="Learn essential tips for growing gorgeous tulips in your garden, including planting, watering, and seasonal care to ensure a vibrant bloom.",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/tulip2.jpg",
    )
    tulips3 = Pin(
        user_id=6,
        title="Unique Tulip Varieties to Add to Your Collection",
        description="Brighten up your space with cheerful tulip color combinations that add a splash of color and joy to any room or garden.",
        image_url="https://pinnovate-files.s3.amazonaws.com/flowers/tulips3.jpg",
    )

    # coffee

    coffee = Pin(
        user_id=2,
        title="Wake Up",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/coffee/coffee.jpg",
    )

    taro_coffee = Pin(
        user_id=3,
        title="Explore beautiful coffee art and latte designs",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/coffee/taro_coffee.jpg",
    )

    srr_olive_oil_coffee = Pin(
        user_id=6,
        title="DIY Coffee Recipes for a Cafe-Style Experience",
        description="Discover unique coffee presentation ideas that will impress your guests and make every cup of coffee a work of art.",
        image_url="https://pinnovate-files.s3.amazonaws.com/coffee/srr_olive_oil_coffee.jpg",
    )

    srr_coffee_pastries = Pin(
        user_id=3,
        title="Perfect Coffee Pairings: Pastries and Snacks",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/coffee/srr_coffee_pastries.jpg",
    )

    srr_coffee_pastries2 = Pin(
        user_id=2,
        title="Cozy Coffee Moments to Warm Your Day",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/coffee/srr_coffee_pastries2.jpg",
    )

    # boba

    boba = Pin(
        user_id=2,
        title="Boba",
        description="Boba date :3",
        image_url="https://pinnovate-files.s3.amazonaws.com/boba/boba1.jpg",
    )

    boba2 = Pin(
        user_id=3,
        title="Boba",
        description=":3",
        image_url="https://pinnovate-files.s3.amazonaws.com/boba/boba_momotea.jpg",
    )

    # Travel/Outdoors

    japanese_garden1 = Pin(
        user_id=3,
        title="Incorporating Japanese Garden Aesthetics into Your Home",
        description="",
        image_url="https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden1.jpg",
    )

    japanese_garden2 = Pin(
        user_id=5,
        title="Japanese Garden Pathways: Design and Inspiration",
        description="Design stunning pathways for your Japanese garden with ideas that guide visitors through serene and picturesque landscapes.",
        image_url="https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden2.jpg",
    )

    japanese_garden_zen_garden = Pin(
        user_id=2,
        title="Creating a Zen Japanese Garden: Tips and Ideas",
        description="Discover serene Japanese garden designs that create a tranquil and peaceful outdoor space, perfect for relaxation and reflection.",
        image_url="https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden_zen_garden.jpg",
    )
    japanese_garden_sculptures = Pin(
        user_id=3,
        title="Traditional and Modern Japanese Garden Inspirations",
        description="Get inspired by both traditional and modern Japanese garden styles, and learn how to incorporate their beauty into your outdoor area.",
        image_url="https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden_sculpture.jpg",
    )

    japanese_garden_waterfall = Pin(
        user_id=2,
        title="Stunning Water Features for Japanese Gardens",
        description="Enhance your Japanese garden with captivating water features such as koi ponds, waterfalls, and streams for a soothing effect.",
        image_url="https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden_waterfall.jpg",
    )

    por_waterfall = Pin(
        user_id=2,
        title="Stunning Waterfalls You Can't Miss On Your Next Trip!",
        description=" ",
        image_url="https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden_waterfall.jpg",
    )

    travel_airplane = Pin(
        user_id=4,
        title="In The Clouds",
        description=" ",
        image_url="https://pinnovate-files.s3.amazonaws.com/travel/travel_airplane.jpg",
    )

    db.session.add_all([demo_pin])

    # cats, boxes
    db.session.add_all([feijai_grass, feijai_box, snowie_box, nightmare_box, bear_yawn])

    # foods and snacks
    db.session.add_all([ramen1, ramen2, ramen3, ramen4, hainan_chicken_rice, bear_icecream_shop, bear_icecream_shop2])

    # flowers
    db.session.add_all(
        [
            rose1,
            rose2,
            rose3,
            rose4,
            flower1,
            flower2,
            flower3,
            flower5,
            orchid1,
            orchid2,
            orchid3,
            orchid4,
            orchid5,
            tulips1,
            tulips2,
            tulips3,
        ]
    )

    # coffee
    db.session.add_all(
        [
            coffee,
            taro_coffee,
            srr_olive_oil_coffee,
            srr_coffee_pastries,
            srr_coffee_pastries2,
        ]
    )

    # boba
    db.session.add_all([boba, boba2])

    # travel/outdoors
    db.session.add_all(
        [
            japanese_garden1,
            japanese_garden2,
            japanese_garden_zen_garden,
            japanese_garden_sculptures,
            japanese_garden_waterfall,
            por_waterfall,
            travel_airplane,
        ]
    )

    db.session.commit()


def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
