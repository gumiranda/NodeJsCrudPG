DROP TABLE IF EXISTS User CASCADE;
DROP TABLE IF EXISTS Movie CASCADE;
DROP TABLE IF EXISTS Location CASCADE;

CREATE TABLE User
(
	id integer NOT NULL,    -- ID DO DOCUMENTO OBTIDO
	password varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	name varchar(100) NOT NULL,
	)
;
CREATE TABLE Movie
(
	id integer NOT NULL,    -- ID DO DOCUMENTO OBTIDO
	quantity integer NOT NULL,    -- ID DO DOCUMENTO OBTIDO
	title varchar(100) NOT NULL,
	director varchar(100) NOT NULL,
	)
;
CREATE TABLE Location
(
	id integer NOT NULL,    -- ID DO DOCUMENTO OBTIDO
	userId integer NOT NULL,    -- ID DO DOCUMENTO OBTIDO
	movieId integer NOT NULL,    -- ID DO DOCUMENTO OBTIDO
	)
;
ALTER TABLE User ADD CONSTRAINT PK_USER
	PRIMARY KEY (id)
;
ALTER TABLE Location ADD CONSTRAINT PK_LOCATION
	PRIMARY KEY (id)
;
ALTER TABLE User ADD CONSTRAINT FK_USER_LOCATION
	FOREIGN KEY (id) REFERENCES Location (userId) ON DELETE No Action ON UPDATE No Action
;
ALTER TABLE Movie ADD CONSTRAINT FK_MOVIE_LOCATION
	FOREIGN KEY (id) REFERENCES Location (movieId) ON DELETE No Action ON UPDATE No Action
;