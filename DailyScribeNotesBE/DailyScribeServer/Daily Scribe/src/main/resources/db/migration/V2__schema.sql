CREATE TABLE dailyscribeschema.journals (
	id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    journal TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);