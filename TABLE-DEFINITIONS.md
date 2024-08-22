Table Users {
  id integer [primary key]
  username varchar(40)
  email varchar(255)
  first_name varchar(50)
  last_name varchar(50)
  bio varchar(255)
  profile_image_url varchar(255)
  hashed_password varchar(255)
}

Table Pins {
  id integer [primary key]
  user_id integer [ref: > Users.id]
  title varchar(50)
  description varchar(255)
  image_url varchar(2550)
  created_at timestamp
  updated_at timestamp
}

Table Comments {
  id integer [primary key]
  user_id integer [ref: > Users.id]
  pin_id integer [ref: > Pins.id]
  comment varchar(255)
  created_at timestamp
  updated_at timestamp
}

Table Boards {
  id integer [primary key]
  user_id integer [ref: > Users.id]
  name varchar(50)
  board_image_url varchar(2550)
  private boolean
}

Table Board_Pins {
  id integer [primary key]
  pin_id integer [ref: > Pins.id]
  board_id integer [ref: > Boards.id]
}

Table Tags {
  id integer [primary key]
  user_id integer [ref: > Users.id]
  name varchar(50)
  description varchar(255)
}

Table Pin_Tags {
  id integer [primary key]
  pin_id integer [ref: > Pins.id]
  tag_id integer [ref: > Tags.id]
}

Table Likes {
  id integer [primary key]
  user_id integer [ref: > Users.id]
  pin_id integer [ref: > Pins.id]
}

Table Followers {
  id integer [primary key]
  follower_id integer [ref: > Users.id]
  following_id integer [ref: > Users.id]
}
