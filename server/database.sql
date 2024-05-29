Create database GymDb;
CREATE TABLE admin (
    login VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50)
);


CREATE TABLE users (
    login VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    name VARCHAR(100),
    age INT,
    dob DATE,
    sex VARCHAR(10),
    weight FLOAT,
    height FLOAT,
    BMI FLOAT,
    gym VARCHAR(100) REFERENCES gym(login),
	program_id INT REFERENCES programs(id)
);

CREATE TABLE gym (
    login VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50),
    gym_details TEXT
);


CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date DATE,
    gym VARCHAR(100) REFERENCES gym(login),
    event_detail text;
);  

CREATE TABLE video (
    id SERIAL PRIMARY KEY,
    url TEXT
);

CREATE TABLE diet_program (
    id SERIAL PRIMARY KEY,
    description TEXT
);


CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100),
	diet_program_id INT REFERENCES diet_program(id),
	 video_id INT REFERENCES video(id)
);

-- Triggers

-- Create the function to calculate and round BMI to two decimal places
CREATE OR REPLACE FUNCTION calculate_bmi()
RETURNS TRIGGER AS $$
BEGIN
  -- Convert height from cm to meters
  NEW.height := NEW.height / 100.0;
  
  -- Calculate and round BMI
  NEW.BMI := ROUND(CAST(NEW.weight / (NEW.height * NEW.height) AS numeric), 2);
  
  -- Since the height is stored in meters now, convert it back to cm for storage
  NEW.height := NEW.height * 100.0;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to update BMI on weight or height change
CREATE TRIGGER update_bmi
BEFORE INSERT OR UPDATE OF weight, height ON users
FOR EACH ROW
EXECUTE FUNCTION calculate_bmi();



--age trigger 
CREATE OR REPLACE FUNCTION calculate_age()
RETURNS TRIGGER AS $$
BEGIN
    NEW.age := DATE_PART('year', AGE(CURRENT_DATE, NEW.dob));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER calculate_age_trigger
BEFORE INSERT OR UPDATE OF dob ON users
FOR EACH ROW
EXECUTE PROCEDURE calculate_age();




-- Views 
CREATE VIEW user_program_details AS
SELECT u.login, u.name, p.type AS program_type, dp.description AS diet_description, v.url AS video_url
FROM users u
LEFT JOIN programs p ON u.program_id = p.id
LEFT JOIN diet_program dp ON p.diet_program_id = dp.id
LEFT JOIN video v ON p.video_id = v.id;



//gym exists trigger
CREATE OR REPLACE FUNCTION check_gym_exists()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM gym WHERE login = NEW.gym) THEN
        RAISE EXCEPTION 'Gym % does not exist', NEW.gym;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_gym_exists_trigger
BEFORE INSERT OR UPDATE OF gym ON users
FOR EACH ROW
EXECUTE FUNCTION check_gym_exists();
