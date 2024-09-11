from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField
from wtforms.validators import DataRequired, Length, URL, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class BoardForm(FlaskForm):
    name = StringField(
        'Name',
        validators=[
            DataRequired(message="Board name is required."),
            Length(max=50, message="Board name cannot exceed 50 characters.")
        ]
    )
    board_image_url =FileField(
        "Profile Image", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    private = BooleanField(
        'Private',
        default=False
    )
