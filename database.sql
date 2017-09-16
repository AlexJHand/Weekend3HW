CREATE TABLE todo (
	id serial PRIMARY KEY,
	taskname varchar,
	complete boolean DEFAULT false);

INSERT INTO todo (taskname)
VALUES ('Get mail');