CREATE DATABASE un_schedule;
USE un_schedule;

CREATE TABLE Specialty (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	spec_name VARCHAR(30) NOT NULL,
	UNIQUE(id) 
);

CREATE TABLE Un_group (
	id VARCHAR(10) NOT NULL PRIMARY KEY,
    specialtyID INT NOT NULL,
    course INT NOT NULL,
    amount_students INT NOT NULL,
    FOREIGN KEY (specialtyID) REFERENCES Specialty(id),
	UNIQUE(id) 
);

CREATE TABLE Date_day (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    day VARCHAR(15) NOT NULL,
	UNIQUE(id) 
);

CREATE TABLE Semester (
	number_semester INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    init_data DATE NOT NULL,
    end_data DATE NOT NULL
);

CREATE TABLE Subjects (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(50) NOT NULL,
	UNIQUE(id) 
);

CREATE TABLE Teacher (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    surname VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    rank VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
	UNIQUE(id) 
);

CREATE TABLE TypeLesson (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


CREATE TABLE Сurriculum (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    teacherID INT NOT NULL,
    subjectID INT NOT NULL,
    type_lessonID INT NOT NULL,
    semesterID INT NOT NULL,
    specialtyID INT NOT NULL,
    amount_hours INT NOT NULL,
    FOREIGN KEY (teacherID) REFERENCES Teacher(id),
    FOREIGN KEY (subjectID) REFERENCES Subjects(id),
    FOREIGN KEY (type_lessonID) REFERENCES TypeLesson(id),
    FOREIGN KEY (semesterID) REFERENCES Semester(number_semester),
    FOREIGN KEY (specialtyID) REFERENCES Specialty(id),
	UNIQUE(id) 
);

CREATE TABLE Audience (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    number_audience INT NOT NULL,
    building INT NOT NULL,
    amount_seats INT NOT NULL,
	UNIQUE(id) 
);

CREATE TABLE Schedules (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    number_lesson INT NOT NULL, 
    number_week INT NOT NULL, 
    
    dayID INT NOT NULL,
    groupID VARCHAR(10) NOT NULL,
    teacherID INT NOT NULL,
    subjectID INT NOT NULL,
    type_lessonID INT NOT NULL,
    semesterID INT NOT NULL,
    specialtyID INT NOT NULL,
    
    FOREIGN KEY (teacherID) REFERENCES Teacher(id),
    FOREIGN KEY (subjectID) REFERENCES Subjects(id),
    FOREIGN KEY (type_lessonID) REFERENCES TypeLesson(id),
    FOREIGN KEY (semesterID) REFERENCES Semester(number_semester),
    FOREIGN KEY (specialtyID) REFERENCES Specialty(id),
    FOREIGN KEY (groupID) REFERENCES Un_group(id),
    FOREIGN KEY (dayID) REFERENCES Date_day(id),
    
	UNIQUE(id) 
);


INSERT INTO `Specialty` (`spec_name`) VALUES
('Software Engineering'),
('Computer Science'),
('Hardware Engineering');

INSERT INTO `Date_day` (`day`) VALUES
('Monday'),
('Tuesday'),
('Wednesday'),
('Thursday'),
('Friday'),
('Saturday');

INSERT INTO `Un_group` (`id`, `specialtyID`, `course`, `amount_students`) VALUES
('TV-51', 1, 3, 20),
('TR-61', 2, 2, 22),
('TO-31', 3, 4, 17);

INSERT INTO `Semester` (`number_semester`, `init_data`, `end_data`) VALUES
(1, '2017-09-1', '2017-12-30'),
(2, '2018-02-10', '2018-06-12'),
(3, '2017-09-1', '2017-12-30'),
(4, '2018-02-10', '2018-06-12'),
(5, '2017-09-1', '2017-12-30'),
(6, '2018-02-10', '2018-06-12'),
(7, '2017-09-1', '2017-12-30'),
(8, '2018-02-10', '2018-03-20');

INSERT INTO `Subjects` (`subject_name`) VALUES
('Declarative programming'),
('Functional programming'),
('Databases');

Select * from Subjects;

SELECT Un_group.id, Specialty.spec_name, Un_group.course, Un_group.amount_students
FROM Un_group
LEFT JOIN Specialty ON Un_group.specialtyID = Specialty.id
ORDER BY Un_group.course;