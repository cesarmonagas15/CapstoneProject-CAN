DROP TABLE IF EXISTS users;



CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1)
);

CREATE TABLE favorites (
  recipe_id INT PRIMARY KEY,
  user_id INT REFERENCES users(id)  
);
