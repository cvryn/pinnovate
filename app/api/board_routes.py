from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Pin, Comment, Tag, Board, like, pin_tag
from app.forms import PinForm, TagForm, BoardForm

board_routes = Blueprint('boards', __name__)

# GET All Boards
@board_routes.route('/all', methods=['GET'])
def get_boards():
    boards = Board.query.all()
    return [board.to_dict() for board in boards], 200

# GET Board by Board Id
@board_routes.route('<int:board_id>', methods=['GET'])
def get_board_by_id(board_id):
    board = Board.query.get(board_id)

    if board is None:
        return {"error": "Board not found"}, 404

    return board.to_dict(), 200
