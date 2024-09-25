from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, Pin, Tag
from app.forms import PinForm
from app.api.aws_helpers import (
    get_unique_filename,
    upload_file_to_s3,
    remove_file_from_s3,
)

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
        image_url = []
        image_files = request.files.getlist("image_url")
        for image_file in image_files:
            image_file.filename = get_unique_filename(image_file.filename)
            upload_result = upload_file_to_s3(image_file, acl="public-read")
            if "url" in upload_result:
                image_url.append(upload_result["url"])
            else:
                return {"errors": upload_result["errors"]}, 400

        new_pin = Pin(
            user_id=current_user.id,
            title=form.title.data,
            description=form.description.data,
            image_url=image_url,
        )

        # Tags
        tag_ids = form.tags.data or []
        tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()
        new_pin.tags.extend(tags)

        db.session.add(new_pin)
        db.session.commit()
        return new_pin.to_dict(), 201

    return {"errors": form.errors}, 400


# PUT Edit Pin by Id belonging to current user
@pin_routes.route("/<int:pin_id>/edit", methods=["PUT"])
def edit_pin(pin_id):
    pin = Pin.query.get(pin_id)

    if not pin:
        return {"error": "Pin not found"}, 404

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    if pin.user_id != current_user.id:
        return {"error": "Forbidden, cannot edit this Pin"}, 403

    image_file = request.files.get("image_url")
    title = request.form.get("title")
    description = request.form.get("description")
    remove_image = request.form.get("remove_image", "false") == "true"

    # Image Upload
    if image_file:
        image_file.filename = get_unique_filename(image_file.filename)
        upload_result = upload_file_to_s3(image_file, acl="public-read")
        if "url" in upload_result:
            # Remove old image
            if pin.image_url:
                remove_file_from_s3(pin.image_url)
            pin.image_url = upload_result["url"]
        else:
            return {"errors": upload_result["errors"]}, 400
    elif remove_image and pin.image_url:
        remove_file_from_s3(pin.image_url)
        pin.image_url = None

    if title:
        pin.title = title.strip()
    if description:
        pin.description = description.strip()


    tag_ids = request.form.getlist("tags")
    if tag_ids:
        pin.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    try:
        db.session.commit()
        return pin.to_dict(), 200
    except Exception as e:
        db.session.rollback()
        return {"error": f"An error occurred while updating the pin: {str(e)}"}, 500



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

    if pin.image_url:
        remove_file_from_s3(pin.image_url)

    db.session.delete(pin)
    db.session.commit()

    return {"message": "Pin has been successfully deleted"}, 200
