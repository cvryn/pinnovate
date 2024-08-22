from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag
from app.forms import PinForm, TagForm, BoardForm


tag_routes = Blueprint("tags", __name__)


# GET All Tags
@tag_routes.route("/all", methods=["GET"])
def get_tags():
    tags = Tag.query.all()
    return [tag.to_dict() for tag in tags], 200


# GET Tags by Pin Id
@tag_routes.route("/pin/<int:pin_id>", methods=["GET"])
def get_tag_by_pin_id(pin_id):
    pin = Pin.query.get(pin_id)

    if pin is None:
        return {"error": "Pin not found"}, 404

    # If the pin does not have any tags -- may remove later
    if not pin.tags:
        return {"error": "Pin does not have any tags."}, 404

    return [tag.to_dict() for tag in pin.tags], 200

# POST create new Tag
@tag_routes.route('/new', methods=["POST"])
def create_new_tag():

    form = TagForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    if form.validate_on_submit():

        existing_tag = Tag.query.filter_by(name=form.data['name']). first()
        if existing_tag:
            return {"error": "Tag with this name already exists"}, 400

        new_tag = Tag(
            name = form.data['name'],
            description = form.data['description']
        )

        db.session.add(new_tag)
        db.session.commit()
        return new_tag.to_dict(), 201

    return {"errors": form.errors}, 400

# POST add tags to pins that belong to currently logged in user
@tag_routes.route('/pin/<int:pin_id>/tag/<int:tag_id>', methods=['POST'])
def add_tag_to_pin(pin_id, tag_id):
    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    pin = Pin.query.get(pin_id)
    if not pin:
        return {"error": "Pin not found"}, 404

    tag = Tag.query.get(tag_id)
    if not tag:
        return {"error": "Tag not found"}, 404

    if pin.user_id != current_user.id:
        return {"error": "Unauthorized to modify this pin"}, 403

    # Check if the tag is already associated with the pin
    if tag in pin.tags:
        return {"error": "Tag is already associated with this pin"}, 400

    pin.tags.append(tag)
    db.session.commit()

    return {"message": "Tag added to pin successfully"}, 200

# PUT edit existing tag
@tag_routes.route('/<int:tag_id>', methods=['PUT'])
def edit_tag(tag_id):
    tag = Tag.query.get(tag_id)

    form = TagForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    if tag is None:
        return {"error": "Tag not found"}, 404

    # if tag.user_id != current_user.id:
    #     return {"error": "Forbidden, cannot edit this tag."}, 403

    if form.validate_on_submit():

        existing_tag = Tag.query.filter(Tag.name == form.data['name'], Tag.id != tag_id).first()
        if existing_tag:
            return {"error": "Tag with this name already exists"}, 400


        # tag.name = form.data['name']
        # tag.description = form.data.get('description', tag.description)

        data = request.get_json()
        name = data.get('name')
        description = data.get('description')

        tag.name = name
        tag.description = description

        db.session.commit()
        return tag.to_dict(), 200

    return {"errors": form.errors}, 400

# DELETE remove tag from pins
@tag_routes.route('/pin/<int:pin_id>/tag/<int:tag_id>', methods=['DELETE'])
def delete_tag_from_pin(pin_id, tag_id):

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    pin = Pin.query.get(pin_id)
    if not pin:
        return {"error": "Pin not found"}, 404

    tag = Tag.query.get(tag_id)
    if not tag:
        return {"error": "Tag not found"}, 404

    if pin.user_id != current_user.id:
        return {"error": "Unauthorized to remove tags from this pin."}, 403


    if tag not in pin.tags:
        return {"error": "Tag not associated with this pin"}, 400

    pin.tags.remove(tag)
    db.session.commit()

    return {"message": "Tag removed from pin successfully"}, 200

# DELETE tags that belongs (was created by) to currently logged in user
@tag_routes.route('/<int:tag_id>', methods=['DELETE'])
def delete_user_created_tag(tag_id):

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    tag = Tag.query.get(tag_id)

    if not tag:
        return {"error": "Tag not found"}, 404

    if tag.user_id != current_user.id:
        return {"error": "Unauthorized to delete this tag"}, 403

    if tag.default:
        return {"error": "Cannot delete default tag"}, 403

    # Remove tag from any associated pins
    for pin in tag.pins:
        pin.tags.remove(tag)

    db.session.delete(tag)
    db.session.commit()

    return {"message": "Tag deleted successfully"}, 200
