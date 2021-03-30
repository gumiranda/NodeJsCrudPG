DROP TABLE IF EXISTS tb_User CASCADE;
DROP TABLE IF EXISTS tb_Movie CASCADE;
DROP TABLE IF EXISTS tb_Location CASCADE;

CREATE TABLE tb_User
(
	id integer NOT NULL,    
	password varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	name varchar(100) NOT NULL
	)
;
CREATE TABLE tb_Movie
(
	id integer NOT NULL,    
	quantity integer NOT NULL,    
	title varchar(100) NOT NULL,
	director varchar(100) NOT NULL
	)
;
CREATE TABLE tb_Location
(
	id integer NOT NULL,    
	userId integer NOT NULL,    
	status_location integer NOT NULL, -- 0 locado e 1 devolvido   
	movieId integer NOT NULL
	)
;
ALTER TABLE tb_User ADD CONSTRAINT PK_USER
	PRIMARY KEY (id)
;
ALTER TABLE tb_Location ADD CONSTRAINT PK_LOCATION
	PRIMARY KEY (id)
;
ALTER TABLE tb_Movie ADD CONSTRAINT PK_MOVIE
	PRIMARY KEY (id)
;
ALTER TABLE tb_Location ADD CONSTRAINT FK_LOCATION_MOVIE
	FOREIGN KEY (movieId) REFERENCES tb_Movie (id) ON DELETE No Action ON UPDATE No Action
;
ALTER TABLE tb_Location ADD CONSTRAINT FK_LOCATION_USER
	FOREIGN KEY (userId) REFERENCES tb_User (id) ON DELETE No Action ON UPDATE No Action
;