-- Drop the existing users table if it exists
DROP TABLE IF EXISTS `users`;

-- Create the users table with the refreshToken column
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255),
  `number` VARCHAR(255),
  `refreshToken` VARCHAR(255), -- Adding refreshToken column
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



-- Insert a sample user into the table with refresh token
INSERT INTO `users` (`name`, `email`, `password`, `role`, `number`, `refreshToken`, `createdAt`, `updatedAt`)
VALUES ('user', 'user1@example.com', 'password123', 'user', '1234567890', 'sample_refresh_token', NOW(), NOW());



-- Select all rows from the users table
SELECT * FROM `users`;



drop table gallery;


CREATE TABLE IF NOT EXISTS gallery (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    image LONGBLOB NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

select * from gallery;




-- IMAGE CONTENT
CREATE TABLE imagecontent (
  id CHAR(36) NOT NULL,
  image BLOB NOT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_paid BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);
 
select * from imagecontent; 



CREATE TABLE videocontent (
  id CHAR(36) NOT NULL,
  video BLOB NOT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_paid BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);

select * from videocontent ;

drop table pdfcontent; 


CREATE TABLE pdfcontent (
  id CHAR(36) NOT NULL,
  pdf BLOB NOT NULL,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_paid BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);

select * from pdfcontent;



drop table schools;


CREATE TABLE schools (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255)  unique NOT NULL,
  address VARCHAR(255) NOT NULL,
  logo BLOB NOT NULL
 
);


select * from schools;




CREATE TABLE news (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  headline VARCHAR(255) NOT NULL UNIQUE,
  description VARCHAR(255) NOT NULL,
  image BLOB ,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from news ;



CREATE TABLE testimonials (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  image BLOB NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL

);

select * from testimonials;



drop table students;

CREATE TABLE students (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  excel_file LONGBLOB, 
  schoolname varchar(200) not null,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from students;




