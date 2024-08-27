from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField
from wtforms.validators import DataRequired, Length, URL, Optional

class PinForm(FlaskForm):
    image_url = StringField(
        'Pin Image',
        validators=[
            DataRequired(message="Image URL is required"),
            URL(message="Must be a valid URL")
        ]
    )
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
