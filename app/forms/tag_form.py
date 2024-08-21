from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class TagForm(FlaskForm):
    name = StringField(
        'Name',
        validators=[
            DataRequired(message="Tag name is required."),
            Length(max=50, message="Tag name cannot exceed 50 characters.")
        ]
    )
    description = StringField(
        'Description',
        validators=[
            Length(max=255, message="Description cannot exceed 255 characters.")
        ]
    )
