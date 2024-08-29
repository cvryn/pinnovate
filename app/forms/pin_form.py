from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, FileField
from wtforms.validators import DataRequired, Length, URL, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class PinForm(FlaskForm):
    image_url = FileField(
        "Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    title = StringField(
        'Title',
        validators=[
            DataRequired(message="Title is required"),
            Length(min=2, max=100, message="Title must be between 2 and 100 characters.")
        ]
    )
    description = StringField(
        "Description",
        validators=[Length(max=255, message="Description cannot exceed 255 characters.")]
    )
    tags = SelectMultipleField(
        "Tags",
        choices=[],
        coerce=int,
        validators=[Optional()]
    )
