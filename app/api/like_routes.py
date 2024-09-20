from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag

like_routes = Blueprint('likes', __name__)

# GET All Pins LIKED By Currently Logged In User
@like_routes.route ('/current/all', methods =["GET"])
def get_liked_pins():
    liked_pins = current_user.liked_pins

    liked_pins_list = [pin.to_dict() for pin in liked_pins]

    return {'liked_pins': liked_pins_list}, 200


# POST Add a Pin to Liked Pins (Like a Pin)
@like_routes.route('/<int:pin_id>/like', methods=["POST"])
def like_pin(pin_id):

    if not current_user.is_authenticated:
        return {
            "error": "User not authenticated. Must be logged in to like a pin."
        }, 401

    pin = Pin.query.get(pin_id)
    if not pin:
         return {"error": "Pin not found"}, 404

     # Check if the pin is already liked by the user
    if pin in current_user.liked_pins:
        liked_pins = [pin.id for pin in current_user.liked_pins]
        return {
            "message": f"Pin Id {pin_id} is already liked by the current user.",
            "liked_pins": liked_pins
        }, 400

    # Add to user's liked pins
    current_user.liked_pins.append(pin)
    db.session.commit()

    # Get all the liked pins for the current user
    liked_pins = [pin.id for pin in current_user.liked_pins]

    return {
        'message': f"Pin Id {pin_id} has been liked successfully.",
        'liked_pins': liked_pins
    }, 200

# DELETE Remove a Pin from Liked Pins (Unlike a Pin)
@like_routes.route('/<int:pin_id>/unlike', methods=["DELETE"])
def unlike_pin(pin_id):

    if not current_user.is_authenticated:
        return {
            "error": "User not authenticated. Must be logged in to like a pin."
        }, 401

    pin = Pin.query.get(pin_id)
    if not pin:
         return {"error": "Pin not found"}, 404

     # Check if the pin is already liked by the user
    if pin not in current_user.liked_pins:
        liked_pins = [pin.id for pin in current_user.liked_pins]
        return {
            "message": f"Pin Id {pin_id} is not liked by the current user.",
            "liked_pins": liked_pins
        }, 400

    current_user.liked_pins.remove(pin)
    db.session.commit()

    liked_pins = [pin.id for pin in current_user.liked_pins]

    return {
        'message': f"Pin Id {pin_id} has been unliked successfully.",
        'liked_pins': liked_pins
    }, 200
