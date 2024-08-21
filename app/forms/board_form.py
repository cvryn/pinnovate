from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length, URL

class BoardForm(FlaskForm):
    name = StringField(
        'Name',
        validators=[
            DataRequired(message="Board name is required."),
            Length(max=50, message="Board name cannot exceed 50 characters.")
        ]
    )
    board_image_url = StringField(
        'Image URL',
        validators=[
            URL(message = "Must be a valid URL")
        ]
    )
    private = BooleanField(
        'Private',
        default=False
    )
