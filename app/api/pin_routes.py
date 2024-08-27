from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag
from app.forms import PinForm, TagForm, BoardForm

pin_routes = Blueprint("pins", __name__)


# GET All Pins
@pin_routes.route("/", methods=["GET"])
def pins():
    pins = Pin.query.all()
    return [pin.to_dict() for pin in pins], 200


# GET Pin by Id
@pin_routes.route("/<int:pin_id>", methods=["GET"])
def pin_by_id(pin_id):
    pin = Pin.query.get(pin_id)

    if not pin:
        return {"error": "Pin not found"}, 404

    return pin.to_dict(), 200


# POST Create new Pin with current user
@pin_routes.route("/new", methods=["POST"])
def create_pin():
    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    tags = Tag.query.all()
    form.tags.choices = [(tag.id, tag.name) for tag in tags]

    if form.validate_on_submit():
        new_pin = Pin(
            user_id=current_user.id,
            title=form.title.data,
            description=form.description.data,
            image_url=form.image_url.data,
        )

        tag_ids = form.tags.data
        tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
        new_pin.tags.extend(tags)

        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict(), 201

    return {"errors": form.errors}, 400


# PUT Edit Pin by Id belonging to current user
@pin_routes.route("/<int:pin_id>", methods=["PUT"])
def edit_pin(pin_id):
    pin = Pin.query.get(pin_id)

    if not pin:
        return {"error": "Pin not found"}, 404

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    form = PinForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    tags = Tag.query.all()
    form.tags.choices = [(tag.id, tag.name) for tag in tags]

    if form.validate_on_submit():
        pin.title = form.title.data
        pin.description = form.description.data
        pin.image_url = form.image_url.data

        if form.tags.data:
            tag_ids = list(map(int, form.tags.data))
            pin.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
        else:
            pin.tags = []

        db.session.commit()
        return pin.to_dict(), 200

    return {"errors": form.errors}, 400

# Delete Pin by Id belonging to current user
@pin_routes.route("/<int:pin_id>", methods=["DELETE"])
def delete_pin(pin_id):

    pin = Pin.query.get(pin_id)

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    if pin is None:
        return {"error": "Pin not found"}, 404

    if pin.user_id != current_user.id:
        return {"error": "Forbidden, cannot delete this Pin"}, 403

    db.session.delete(pin)
    db.session.commit()

    return {"message": "Pin has been successfully deleted"}, 200
