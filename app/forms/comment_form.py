from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment = StringField('Comment', validators=[DataRequired(message="Cannot send an empty comment."), Length(max=255, message="Comments cannot exceed 255 characters.")])
