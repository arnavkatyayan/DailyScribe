ALTER TABLE dailyscribeschema.journals
ADD COLUMN title VARCHAR(255) NOT NULL DEFAULT 'Untitled';

ALTER TABLE dailyscribeschema.users
ADD COLUMN status BOOLEAN NOT NULL DEFAULT TRUE;
