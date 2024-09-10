from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag
from app.forms import PinForm, TagForm, BoardForm
from app.api.aws_helpers import (
    get_unique_filename,
    upload_file_to_s3,
    remove_file_from_s3,
)

board_routes = Blueprint("boards", __name__)


# GET All Boards
@board_routes.route("/all", methods=["GET"])
def get_boards():
    boards = Board.query.all()
    return [board.to_dict() for board in boards], 200


# GET Board by Board Id
@board_routes.route("<int:board_id>", methods=["GET"])
def get_board_by_id(board_id):
    board = Board.query.get(board_id)

    if board is None:
        return {"error": "Board not found"}, 404

    return board.to_dict(), 200


# POST Create a new Board
@board_routes.route("/new", methods=["POST"])
def create_board():
    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if not current_user.is_authenticated:
        return {
            "error": "User not authenticated. Must be logged in to create a board."
        }, 401

    existing_board = Board.query.filter_by(
        user_id=current_user.id, name=form.name.data
    ).first()
    if existing_board:
        return {"error": f"You already have a board named '{form.name.data}'."}, 400

    if form.validate_on_submit():
        # Image Upload
        image_file = request.files.get("board_image_url")
        board_image_url = None
        if image_file:
            image_file.filename = get_unique_filename(image_file.filename)
            upload_result = upload_file_to_s3(image_file, acl="public-read")
            if "url" not in upload_result:
                return {"errors": upload_result["errors"]}, 400
            board_image_url = upload_result["url"]

        new_board = Board(
            user_id=current_user.id,
            name=form.name.data,
            board_image_url=board_image_url,
            private=form.private.data,
        )

        db.session.add(new_board)
        db.session.commit()

        return new_board.to_dict(), 201

    return {"errors": form.errors}, 400


# PUT Edit Existing Board by Board Id
@board_routes.route("/<int:board_id>/edit", methods=["PUT"])
def edit_board(board_id):
    board = Board.query.get(board_id)

    if not board:
        return {"error": "Board not found"}, 404

    if not current_user.is_authenticated:
        return {
            "error": "User not authenticated. Must be logged in to edit a board."
        }, 401

    if board.user_id != current_user.id:
        return {"error": "Forbidden, cannot edit this board"}, 403

    form = BoardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    # Check if board name is being changed
    if form.name.data != board.name:
        existing_board = Board.query.filter_by(
            user_id=current_user.id, name=form.name.data
        ).first()
        if existing_board:
            return {"error": f"You already have a board named '{form.name.data}'."}, 400

    if form.validate_on_submit():
        # Image Upload
        image_file = request.files.get("board_image_url")
        remove_image = request.form.get("remove_image", "false") == "true"

        if image_file:
            image_file.filename = get_unique_filename(image_file.filename)
            upload_result = upload_file_to_s3(image_file, acl="public-read")
            if "url" in upload_result:
                # Remove the old image from S3 if it exists
                if board.board_image_url:
                    remove_file_from_s3(board.board_image_url)
                board.board_image_url = upload_result["url"]
            else:
                return {"errors": upload_result["errors"]}, 400
        elif remove_image and board.board_image_url:
            # Remove the image if the user wants
            remove_file_from_s3(board.board_image_url)
            board.board_image_url = None

        board.name = form.name.data.strip()
        board.private = form.private.data

        try:
            db.session.commit()
            return board.to_dict(), 200
        except Exception as e:
            db.session.rollback()
            return {
                "error": f"An error occurred while updating the board: {str(e)}"
            }, 500

    return {"errors": form.errors}, 400


# DELETE a Board by its Id for the current user
@board_routes.route("/<int:board_id>", methods=["DELETE"])
def delete_board(board_id):
    board = Board.query.get(board_id)

    if not current_user.is_authenticated:
        return {"error": "User not authenticated"}, 401

    if board is None:
        return {"error": "Board not found"}, 404

    if board.user_id != current_user.id:
        return {"error": "Forbidden, cannot delete this board"}, 403

    db.session.delete(board)
    db.session.commit()

    return {"message": "Board has been successfully deleted"}, 200
