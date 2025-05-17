CREATE SCHEMA IF NOT EXISTS dailyscribeschema;

CREATE TABLE dailyscribeschema.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO dailyscribeschema.users (username, email, password)
VALUES ('user','abc@gmail.com','pass')
ON CONFLICT (username) DO NOTHING;
