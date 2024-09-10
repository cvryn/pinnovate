from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag
from app.forms import PinForm, TagForm, BoardForm
from app.api.aws_helpers import (
    get_unique_filename,
    upload_file_to_s3,
    remove_file_from_s3,
)

boardpin_routes = Blueprint("board_pins", __name__)

# POST Add Pin(s) to Board
@boardpin_routes.route("/board/<int:board_id>/pins/<int:pin_id>/add", methods=["POST"])
def add_pin_to_board(board_id, pin_id):

    board = Board.query.get(board_id)
    pin = Pin.query.get(pin_id)

    if not board:
        return {"error": "Board not found"}, 404
    if not pin:
        return {"error": "Pin not found"}, 404

    # Check if current user owns the board
    if board.user_id != current_user.id:
        return {"error": "You do not own this board"}, 403

    # Add pin to the board if not already added
    if pin not in board.pins:
        board.pins.append(pin)
        db.session.commit()
        return {"message": "Pin added to board successfully"}, 200
    else:
        return {"error": "Pin already exists on this board"}, 400


# DELETE Pin from Board
@boardpin_routes.route("/board/<int:board_id>/pins/<int:pin_id>/remove", methods=["DELETE"])
def remove_pin_from_board(board_id, pin_id):

    board = Board.query.get(board_id)
    pin = Pin.query.get(pin_id)

    if not board:
        return {"error": "Board not found"}, 404
    if not pin:
        return {"error": "Pin not found"}, 404

    # Check if current user owns the board
    if board.user_id != current_user.id:
        return {"error": "You do not own this board"}, 403

    # Remove the pin from the board if it's there
    if pin in board.pins:
        board.pins.remove(pin)
        db.session.commit()
        return {"message": "Pin removed from board successfully"}, 200
    else:
        return {"error": "Pin not found on this board"}, 400
