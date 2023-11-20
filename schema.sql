DROP TABLE IF EXISTS players;
CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  name TEXT NOT NULL, 
  email TEXT NOT NULL
);

-- Optionally, uncomment the below query to create data
INSERT INTO players (name, email) VALUES ('Alfreds Futterkiste', 'alfred@gmail.com'), ('Arnand Beetle', 'Arnand@gmail.com'), ('Bs Beverages', 'victoria@gmail.com');