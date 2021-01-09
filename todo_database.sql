CREATE DATABASE todo_database;

--\c into todo_database

CREATE TABLE todo(
	id SERIAL PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description VARCHAR(256),
	input_date date NOT NULL DEFAULT CURRENT_DATE,
	priority integer NOT NULL,
	state varchar(20) NOT NULL
)