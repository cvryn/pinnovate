from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import (
    get_unique_filename,
    upload_file_to_s3,
    remove_file_from_s3,
)


auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    # return {'errors': {'message': 'Unauthorized'}}, 401
    return {"errors": {"message": "User not logged in"}}, 200


@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data["email"]).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        image_file = form.profile_image_url.data

        if image_file:
            image_file.filename = get_unique_filename(image_file.filename)
            upload_result = upload_file_to_s3(image_file, acl="public-read")

            if "url" not in upload_result:
                return {"errors": upload_result["errors"]}, 400

            profile_image_url = upload_result["url"]
        else:

            profile_image_url = "https://pinnovate-files.s3.amazonaws.com/demo/demo-user-profile-pic.jpg"

        user = User(
            email=form.data["email"],
            username=form.data["username"],
            first_name=form.data["first_name"],
            last_name=form.data["last_name"],
            bio=form.data["bio"],
            profile_image_url=profile_image_url,
            password=form.data["password"],
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict(), 201

    return {"errors": form.errors}, 400


@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": {"message": "Unauthorized"}}, 401
