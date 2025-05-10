CREATE DATABASE yuva_kreeda_vikasa;

CREATE TABLE players (
    player_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT NOT NULL,
    birthdate DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    address TEXT,
    emergency_contact VARCHAR(15),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);