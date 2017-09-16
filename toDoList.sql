CREATE TABLE todo (
	id serial PRIMARY KEY,
	taskname varchar,
	complete boolean DEFAULT false);