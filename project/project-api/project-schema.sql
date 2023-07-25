DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS users CASCADE;



CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL,
  password   TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name  TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1)
);

CREATE TABLE favorites (
  recipe_id INT NOT NULL,
  user_id INT NOT NULL REFERENCES users(id),
  PRIMARY KEY (recipe_id, user_id)
);

