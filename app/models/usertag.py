# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime, timezone

# user_tag = db.Table(
#     'user_tag',
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
#     db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True),
#     created_at = db.Column(db.DateTime, default=lambda: datetime.now(tz=timezone.utc))
# )

# if environment == "production":
#     user_tag.schema = SCHEMA
