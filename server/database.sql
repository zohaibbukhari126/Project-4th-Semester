Create database GymDb;
CREATE TABLE admin (
    login VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50)
);


CREATE TABLE "user" (
    login VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    name VARCHAR(100),
    age INT,
    sex VARCHAR(10),
    weight FLOAT,
    height FLOAT,
    BMI FLOAT,
    gym VARCHAR(100) REFERENCES gym(login),
	program_id INT REFERENCES program(id)
);

CREATE TABLE gym (
    login VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    gym_details TEXT,
    upcoming_details TEXT
);


CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date DATE,
    gym VARCHAR(100) REFERENCES gym(login)
);

CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    url TEXT
);

CREATE TABLE diet_program (
    id SERIAL PRIMARY KEY,
    description TEXT
);


CREATE TABLE program (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100),
	diet_program_id INT REFERENCES diet_program(id),
	 video_id INT REFERENCES video(id)
);

