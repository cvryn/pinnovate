from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag

pintag_routes = Blueprint("pin_tags", __name__)


# POST Add Tag(s) to Pin
@pintag_routes.route("/pin/<int:pin_id>/tags/add", methods=["POST"])
def add_tags_to_pin(pin_id):
    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    pin = Pin.query.get(pin_id)
    if not pin:
        return {"error": "Pin not found"}, 404

    if pin.user_id != current_user.id:
        return {"error": "Unauthorized to modify this pin"}, 403

    # parse the JSON data sent to request body and converts into Python dictionary
    data = request.get_json()
    tag_ids = data.get("tag_ids", [])

    if tag_ids:
        existing_tag_ids = {tag.id for tag in pin.tags}
        new_tags = []
        non_existent_tags = []
        already_associated_tags = []

        for tag_id in tag_ids:
            tag = Tag.query.get(tag_id)
            if tag:
                if tag.id not in existing_tag_ids:
                    new_tags.append(tag)
                else:
                    already_associated_tags.append(tag_id)
            else:
                non_existent_tags.append(tag_id)

        if non_existent_tags:
            return {"error": f"Tags ID(s) {non_existent_tags} do not exist"}, 404

        if already_associated_tags:
            current_tags = [{"id": tag.id, "name": tag.name} for tag in pin.tags]
            return {
                "message": f"Tags ID(s) {already_associated_tags} are already associated with this pin",
                "current_tags": current_tags
            }, 400

        if new_tags:
            pin.tags.extend(new_tags)
            db.session.commit()

            added_tags = [{"id": tag.id, "name": tag.name} for tag in new_tags]
            current_tags = [{"id": tag.id, "name": tag.name} for tag in pin.tags]

            return {
                "message": "Tags added to pin successfully",
                "added_tags": added_tags,
                "current_tags": current_tags
            }, 200
        else:
            return {"message": "No tags provided. No tags were added."}, 200


# DELETE Remove Tag(s) from Pin
@pintag_routes.route('/pin/<int:pin_id>/tags/delete', methods=["DELETE"])
def remove_tags_from_pin(pin_id):
    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    pin = Pin.query.get(pin_id)
    if not pin:
        return {"error": "Pin not found"}, 404

    if pin.user_id != current_user.id:
        return {"error": "Unauthorized to modify this pin"}, 403

    # Parse the JSON data sent to request body
    data = request.get_json()
    tag_ids = data.get("tag_ids", [])

    if not tag_ids:
        return {"error": "No tag ID(s) provided"}, 400

    tags_to_remove = []
    for tag_id in tag_ids:
        tag = Tag.query.get(tag_id)
        if tag and tag in pin.tags:
            tags_to_remove.append(tag)

    if not tags_to_remove:
        return {"error": "None of the provided tags are associated with this pin"}, 400

    # Remove the tag(s)
    for tag in tags_to_remove:
        pin.tags.remove(tag)

    db.session.commit()

    # Get the remaining tags
    remaining_tags = [{"id": tag.id, "name": tag.name} for tag in pin.tags]

    return {
        "message": "Tags removed successfully",
        "removed_tags": [{"id": tag.id, "name": tag.name} for tag in tags_to_remove],
        "remaining_tags": remaining_tags
    }, 200
