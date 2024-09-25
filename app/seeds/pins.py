from app.models import db, environment, SCHEMA, Pin
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_pins():
    demo_pin = Pin(
        user_id=1,
        title="Demo Pin",
        description="This is a demo description for a demo pin.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/demo/demo-pin-image.jpg", "https://pinnovate-files.s3.amazonaws.com/demo/demo-pin-image.jpg" ],
    )

    # cats, boxes
    feijai_grass = Pin(
        user_id=2,
        title="In the jungle",
        description="Exploring the jungle today",
        image_url=["https://pinnovate-files.s3.amazonaws.com/cats/fj_grass.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/fj_grass_low.jpg" ],
    )

    feijai_box = Pin(
        user_id=2,
        title="Afternoon plans",
        description="Great ways to spend the afternoon",
        image_url=["https://pinnovate-files.s3.amazonaws.com/cats/fj_box.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/fj_box_low.jpg"],
    )

    snowie_box = Pin(
        user_id=3,
        title="Box time",
        description="Biggest box EVER",
        image_url=["https://pinnovate-files.s3.amazonaws.com/cats/snowie_box.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/snowie_box_low.jpg"],
    )

    nightmare_box = Pin(
        user_id=4,
        title="Box time",
        description="How to stay chillin' like a villain",
        image_url=["https://pinnovate-files.s3.amazonaws.com/cats/nightmare_box.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/nightmare_box_low.jpg"],
    )

    bear_yawn = Pin(
        user_id=5,
        title="zzz",
        description="Just an eepy baby",
        image_url=["https://pinnovate-files.s3.amazonaws.com/cats/bear_yawn_box.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/bear_yawn_box_low.jpg"],
    )

    # food
    ramen1 = Pin(
        user_id=2,
        title="Yum!",
        description="It's om nom nom time! :3",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/ramen1.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/ramen1_low.jpg"],
    )

    ramen2 = Pin(
        user_id=3,
        title="ramen",
        description="ramen",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/ramen2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/ramen2_low.jpg"],
    )

    ramen3 = Pin(
        user_id=4,
        title="Time to eat!",
        description="New place in town!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/ramen3.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/ramen3_low.jpg"],
    )

    ramen4 = Pin(
        user_id=5,
        title="Ingredients for Ramen",
        description="pork broth, dried ramen noodles, eggs, enoki, green onions, chashu pork belly, soy sauce, sake, mirin, sugar, clove garlic",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/ramen4.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/ramen4_low.jpg"],
    )

    hainan_chicken_rice = Pin(
        user_id=2,
        title="Chicken Rice Peanuts",
        description="A meal for champions",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/hainan_chicken_rice.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/hainan_chicken_rice_low.jpg"],
    )

    burger = Pin(
        user_id=4,
        title="Burger",
        description="Top 10 Burger Places to Visit in the Bay Area",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/burger.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/burger_low.jpg"],
    )

    bear_icecream_shop = Pin(
        user_id=2,
        title="Cute Ice Cream Shops!",
        description="Top 10 Ice Cream Shops to Visit in the Bay Area",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/bear_icecream_shop.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/bear_icecream_shop_low.jpg"],
    )
    bear_icecream_shop2 = Pin(
        user_id=2,
        title="Cute Ice Cream Shops!",
        description="I scream for ice cream!!!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/food/bear_icecream_shop2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/bear_icecream_shop2_low.jpg"],
    )

    # flowers
    rose1 = Pin(
        user_id=2,
        title="Spring Time",
        description="Rose Care Tips for a Lush Bloom",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/rose1.jpg", " https://pinnovate-files.s3.amazonaws.com/resized-images/rose1_low.jpg"],
    )

    rose2 = Pin(
        user_id=3,
        title="Roses in Bloom",
        description="Roses",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/rose2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/rose2_low.jpg"],
    )

    rose3 = Pin(
        user_id=4,
        title="Roses in Bloom",
        description="Ready for allergies??",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/rose3.JPG", "https://pinnovate-files.s3.amazonaws.com/resized-images/rose3_low.jpg"],
    )

    rose4 = Pin(
        user_id=6,
        title="Spring",
        description="Brighten your space with colorful spring flowers! Find tips and inspiration for arranging and displaying these seasonal blooms.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/rose4.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/rose4_low.jpg"],
    )

    flower1 = Pin(
        user_id=2,
        title="Bright and Beautiful Flower Color Combinations",
        description="Brighten up your home with beautiful flower color combinations that create a lively and inviting atmosphere.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/flowers1.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/flowers1_low.jpg"],
    )
    flower2 = Pin(
        user_id=3,
        title="Inspiring Flower Garden Ideas",
        description="Get inspired with creative flower garden ideas that will help you design a vibrant and welcoming outdoor space.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/flowers2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/flowers2_low.jpg"],
    )

    flower3 = Pin(
        user_id=4,
        title="Spooky",
        description="Goth-eque flower ideas for the spoooooooky seasons!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/flowers3.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/flowers3_low.jpg"],
    )

    flower5 = Pin(
        user_id=6,
        title="Spring",
        description="Spring",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/flowers5.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/flowers5_low.jpg"],
    )

    orchid1 = Pin(
        user_id=5,
        title="Beautiful Orchid Care Tips and Tricks",
        description="Orchids",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/orchid1.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/orchid1_low.jpg"],
    )

    orchid2 = Pin(
        user_id=6,
        title="Orchid Flowering Patterns and Colors to Inspire",
        description="Orchids",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/orchid2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/orchid2_low.jpg"],
    )

    orchid3 = Pin(
        user_id=2,
        title="Unique and Rare Orchid Species to Discover",
        description="Explore a selection of stunning orchid varieties that will bring elegance and beauty to your home decor with their unique blooms.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/orchids3.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/orchids3_low.jpg"],
    )

    orchid4 = Pin(
        user_id=4,
        title="Creating a Stunning Orchid Garden: A Visual Guide",
        description="Find creative DIY ideas for potting and displaying orchids to showcase their beauty and make a statement in your home.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/orchids4.JPG", "https://pinnovate-files.s3.amazonaws.com/resized-images/orchids4_low.jpg"],
    )

    orchid5 = Pin(
        user_id=3,
        title="Tips for Growing Gorgeous Orchids",
        description="Comment your thoughts on your favorite orchids!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/orchids5.JPG", "https://pinnovate-files.s3.amazonaws.com/resized-images/orchids5_low.jpg"],
    )

    tulips1 = Pin(
        user_id=3,
        title="Beautiful Tulip Varieties for Every Garden",
        description="What are your favorite tulips? Share below!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/tulips1.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/tulips1_low.jpg"],
    )
    tulips2 = Pin(
        user_id=2,
        title="Seasonal Tulip Trends to Try This Year",
        description="Learn essential tips for growing gorgeous tulips in your garden, including planting, watering, and seasonal care to ensure a vibrant bloom.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/tulip2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/tulip2_low.jpg"],
    )
    tulips3 = Pin(
        user_id=6,
        title="Unique Tulip Varieties to Add to Your Collection",
        description="Brighten up your space with cheerful tulip color combinations that add a splash of color and joy to any room or garden.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/flowers/tulips3.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/tulips3_low.jpg"],
    )

    # coffee

    coffee = Pin(
        user_id=2,
        title="Wake Up",
        description="Meet me at the coffee shop!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/coffee/coffee.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/coffee_low.jpg"],
    )

    taro_coffee = Pin(
        user_id=3,
        title="Explore beautiful coffee art and latte designs",
        description="Never too late for coffee art",
        image_url=["https://pinnovate-files.s3.amazonaws.com/coffee/taro_coffee.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/taro_coffee_low.jpg"],
    )

    srr_olive_oil_coffee = Pin(
        user_id=6,
        title="DIY Coffee Recipes for a Cafe-Style Experience",
        description="Discover unique coffee presentation ideas that will impress your guests and make every cup of coffee a work of art.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/coffee/srr_olive_oil_coffee.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/srr_olive_oil_coffee_low.jpg"],
    )

    srr_coffee_pastries = Pin(
        user_id=3,
        title="Perfect Coffee Pairings: Pastries and Snacks",
        description="Recipes that compare to your favorite cafe pastries!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/coffee/srr_coffee_pastries.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/srr_coffee_pastries_low.jpg"],
    )

    srr_coffee_pastries2 = Pin(
        user_id=2,
        title="Cozy Coffee Moments to Warm Your Day",
        description="Yum!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/coffee/srr_coffee_pastries2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/srr_coffee_pastries2_low.jpg"],
    )

    # boba

    boba = Pin(
        user_id=2,
        title="Boba",
        description="Boba date :3",
        image_url=["https://pinnovate-files.s3.amazonaws.com/boba/boba1.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/boba1_low.jpg"],
    )

    boba2 = Pin(
        user_id=3,
        title="Boba",
        description="Boba for days!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/boba/boba_momotea.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/boba_momotea_low.jpg"],
    )

    # Travel/Outdoors

    japanese_garden1 = Pin(
        user_id=3,
        title="Incorporating Japanese Garden Aesthetics into Your Home",
        description="How to style your japanese garden.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden1.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/japanese_garden1_low.jpg"],
    )

    japanese_garden2 = Pin(
        user_id=5,
        title="Japanese Garden Pathways: Design and Inspiration",
        description="Design stunning pathways for your Japanese garden with ideas that guide visitors through serene and picturesque landscapes.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden2.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/japanese_garden2_low.jpg"],
    )

    japanese_garden_zen_garden = Pin(
        user_id=2,
        title="Creating a Zen Japanese Garden: Tips and Ideas",
        description="Discover serene Japanese garden designs that create a tranquil and peaceful outdoor space, perfect for relaxation and reflection.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden_zen_garden.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/japanese_garden_zen_garden_low.jpg"],
    )
    japanese_garden_sculptures = Pin(
        user_id=3,
        title="Traditional and Modern Japanese Garden Inspirations",
        description="Get inspired by both traditional and modern Japanese garden styles, and learn how to incorporate their beauty into your outdoor area.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden_sculpture.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/japanese_garden_sculpture_low.jpg"],
    )

    japanese_garden_waterfall = Pin(
        user_id=2,
        title="Stunning Water Features for Japanese Gardens",
        description="Enhance your Japanese garden with captivating water features such as koi ponds, waterfalls, and streams for a soothing effect.",
        image_url=["https://pinnovate-files.s3.amazonaws.com/travel/japanese_garden_waterfall.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/japanese_garden_waterfall_low.jpg"],
    )

    por_waterfall = Pin(
        user_id=2,
        title="Stunning Waterfalls You Can't Miss On Your Next Trip!",
        description="Waterfalls to die for!",
        image_url=["https://pinnovate-files.s3.amazonaws.com/travel/por_waterfall.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/por_waterfall_low.jpg"],
    )

    travel_airplane = Pin(
        user_id=4,
        title="In The Clouds",
        description="Where are your next travel plans?",
        image_url=["https://pinnovate-files.s3.amazonaws.com/travel/travel_airplane.jpg", "https://pinnovate-files.s3.amazonaws.com/resized-images/travel_airplane_low.jpg"],
    )

    db.session.add_all([demo_pin])

    # cats, boxes
    db.session.add_all([feijai_grass, feijai_box, snowie_box, nightmare_box, bear_yawn])

    # foods and snacks
    db.session.add_all([ramen1, ramen2, ramen3, ramen4, hainan_chicken_rice, burger, bear_icecream_shop, bear_icecream_shop2])

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
