from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, Pin, Tag
from app.forms import TagForm

tag_routes = Blueprint("tags", __name__)

# GET All Tags
@tag_routes.route("/all", methods=["GET"])
def get_tags():
    try:
        tags = Tag.query.all()
        return jsonify([tag.to_dict() for tag in tags]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# GET Tags by Pin Id
@tag_routes.route("/pin/<int:pin_id>", methods=["GET"])
def get_tag_by_pin_id(pin_id):
    pin = Pin.query.get(pin_id)
    if pin is None:
        return jsonify({"error": "Pin not found"}), 404
    if not pin.tags:
        return jsonify({"error": "Pin does not have any tags."}), 404
    return jsonify([tag.to_dict() for tag in pin.tags]), 200

# POST create new Tag
@tag_routes.route('/new', methods=["POST"])
def create_new_tag():
    form = TagForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if not current_user.is_authenticated:
        return jsonify({"error": "User not authenticated"}), 401

    if form.validate_on_submit():
        existing_tag = Tag.query.filter_by(name=form.data['name']).first()
        if existing_tag:
            return jsonify({"error": "Tag with this name already exists"}), 400

        new_tag = Tag(
            name=form.data['name'],
            description=form.data.get('description', '')
        )
        db.session.add(new_tag)
        db.session.commit()
        return jsonify(new_tag.to_dict()), 201

    return jsonify({"errors": form.errors}), 400

# POST add tags to pins
@tag_routes.route('/pin/<int:pin_id>/tag/<int:tag_id>', methods=['POST'])
def add_tag_to_pin(pin_id, tag_id):
    if not current_user.is_authenticated:
        return jsonify({"error": "User not authenticated"}), 401

    pin = Pin.query.get(pin_id)
    if not pin:
        return jsonify({"error": "Pin not found"}), 404

    tag = Tag.query.get(tag_id)
    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    if pin.user_id != current_user.id:
        return jsonify({"error": "Unauthorized to modify this pin"}), 403

    if tag in pin.tags:
        return jsonify({"error": "Tag is already associated with this pin"}), 400

    pin.tags.append(tag)
    db.session.commit()
    return jsonify({"message": "Tag added to pin successfully"}), 200

# PUT edit existing tag
@tag_routes.route('/<int:tag_id>', methods=['PUT'])
def edit_tag(tag_id):
    tag = Tag.query.get(tag_id)
    if tag is None:
        return jsonify({"error": "Tag not found"}), 404

    if not current_user.is_authenticated:
        return jsonify({"error": "User not authenticated"}), 401

    form = TagForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        existing_tag = Tag.query.filter(Tag.name == form.data['name'], Tag.id != tag_id).first()
        if existing_tag:
            return jsonify({"error": "Tag with this name already exists"}), 400

        data = request.get_json()
        tag.name = data.get('name', tag.name)
        tag.description = data.get('description', tag.description)

        db.session.commit()
        return jsonify(tag.to_dict()), 200

    return jsonify({"errors": form.errors}), 400

# DELETE remove tag from pins
@tag_routes.route('/pin/<int:pin_id>/tag/<int:tag_id>', methods=['DELETE'])
def delete_tag_from_pin(pin_id, tag_id):
    if not current_user.is_authenticated:
        return jsonify({"error": "User not authenticated"}), 401

    pin = Pin.query.get(pin_id)
    if not pin:
        return jsonify({"error": "Pin not found"}), 404

    tag = Tag.query.get(tag_id)
    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    if pin.user_id != current_user.id:
        return jsonify({"error": "Unauthorized to remove tags from this pin"}), 403

    if tag not in pin.tags:
        return jsonify({"error": "Tag not associated with this pin"}), 400

    pin.tags.remove(tag)
    db.session.commit()
    return jsonify({"message": "Tag removed from pin successfully"}), 200

# DELETE tags created by currently logged in user
@tag_routes.route('/<int:tag_id>', methods=['DELETE'])
def delete_user_created_tag(tag_id):
    if not current_user.is_authenticated:
        return jsonify({"error": "User not authenticated"}), 401

    tag = Tag.query.get(tag_id)
    if not tag:
        return jsonify({"error": "Tag not found"}), 404

    if tag.user_id != current_user.id:
        return jsonify({"error": "Unauthorized to delete this tag"}), 403

    if tag.default:
        return jsonify({"error": "Cannot delete default tag"}), 403

    for pin in tag.pins:
        pin.tags.remove(tag)

    db.session.delete(tag)
    db.session.commit()
    return jsonify({"message": "Tag deleted successfully"}), 200
