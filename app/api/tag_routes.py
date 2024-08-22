from flask import Blueprint, request, jsonify
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag
from app.forms import PinForm, TagForm, BoardForm


tag_routes = Blueprint('tags', __name__)

@tag_routes.route("/api/tags", methods=["GET"])
def get_tags():
    tags = Tag.query.all()
    return jsonify({
        "tags": [tag.to_dict() for tag in tags]
    })
