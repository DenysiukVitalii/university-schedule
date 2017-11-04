CREATE DATABASE un_schedule
DEFAULT CHARACTER SET utf8
DEFAULT COLLATE utf8_general_ci;

SET NAMES 'utf8';
SET CHARACTER SET utf8;

USE un_schedule;
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0;


show variables like 'foreign_key_checks';
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
select Un_group.id, specialtyID, spec_name, course, amount_students 
from Un_group
join Specialty on Un_group.specialtyID = Specialty.id;
UPDATE Un_group 
SET id = 'TY-51', specialtyID = 2, course = 1, amount_students = 22 
WHERE id = 'TY-51';



CREATE TABLE Date_day (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    day VARCHAR(15) NOT NULL,
	UNIQUE(id) 
);

CREATE TABLE Semesters (
	number_semester INT NOT NULL PRIMARY KEY,
    init_data DATE NOT NULL,
    end_data DATE NOT NULL
);

CREATE TABLE Subjects (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(50) NOT NULL,
	UNIQUE(id) 
);

CREATE TABLE Teachers (
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
    semesterID INT NOT NULL,
    specialtyID INT NOT NULL,
    FOREIGN KEY (teacherID) REFERENCES Teachers(id),
    FOREIGN KEY (subjectID) REFERENCES Subjects(id),
    FOREIGN KEY (semesterID) REFERENCES Semesters(number_semester),
    FOREIGN KEY (specialtyID) REFERENCES Specialty(id),
	UNIQUE(id) 
);

CREATE TABLE AmountHours (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    amount_hours INT NOT NULL,
    type_lessonID INT NOT NULL,
    curriculumID INT NOT NULL,
    FOREIGN KEY (type_lessonID) REFERENCES TypeLesson(id),
    FOREIGN KEY (curriculumID) REFERENCES Сurriculum(id),
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
('Програмна інженерія');

INSERT INTO `Specialty` (`spec_name`) VALUES
('Software Engineering'),
('Computer Science'),
('Hardware Engineering');

UPDATE Specialty SET spec_name = 'testaa' WHERE id = 4;


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
('TO-31', 3, 4, 17),
('IP-52', 1, 3, 16),
('KT-61', 2, 2, 21),
('BN-31', 3, 4, 20);
truncate Un_group;

select * from Semesters;
truncate Semesters;
INSERT INTO `Semesters` (`number_semester`, `init_data`, `end_data`) VALUES
(1, '2017-09-1', '2017-12-30'),
(2, '2018-02-10', '2018-06-12'),
(3, '2017-09-1', '2017-12-30'),
(4, '2018-02-10', '2018-06-12'),
(5, '2017-09-1', '2017-12-30'),
(6, '2018-02-10', '2018-06-12'),
(7, '2017-09-1', '2017-12-30'),
(8, '2018-02-10', '2018-03-20'),
(9, '2017-09-1', '2017-12-30'),
(10, '2018-02-10', '2018-06-12'),
(11, '2017-09-1', '2017-12-30'),
(12, '2018-02-10', '2018-03-20');

UPDATE Semesters SET init_data = '2017-09-2',
					end_data = '2017-12-31' 
WHERE number_semester = 1;

INSERT INTO `Subjects` (`subject_name`) VALUES
('Declarative programming'),
('Functional programming'),
('Databases'),
('Networks'),
('Operating systems'),
('Computer Archirecture'),
('C++ programming'),
('UNIX tools and scripting'),
('Compilers');

select * from Teacher;
delete from Subjects;
truncate Teacher;
 show variables like '%char%';
 INSERT INTO `Teacher` (`surname`, `name`, `lastname`, `position`, `rank`, `phone`) VALUES
("Рембет", "Олег", "Юрійович", "Архітектор", "Лаборант", "097556343");
 
INSERT INTO `Teachers` (`surname`, `name`, `lastname`, `position`, `rank`, `phone`) VALUES
('Rembet', 'Oleg', 'Yurievich', 'Computer architector', 'Lecturer', '0975566223'),
('Glembotskyy', 'Alex', 'Viktorovich', 'Networks master', 'Docent', '0965622874'),
('Pavlyuk', 'Artur', 'Vadimovich', 'Software developer', 'Profesor', '0995662334'),
('Ivanov', 'Ivan', 'Ivanovich', 'Declarative developer', 'Profesor', '0985623547'),
('Teteruk', 'Igor', 'Anatolievich', 'Database developer', 'Docent', '0962247589'),
('Oleynik', 'Sergiy', 'Vasilevich', 'Functional developer', 'Instructor', '0669956254');

ALTER TABLE Specialty CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;
ALTER TABLE Specialty DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

select * from TypeLesson;

INSERT INTO `TypeLesson` (`name`) VALUES
('Lecture'),
('Practice'),
('Laboratory');

INSERT INTO `Сurriculum` (`specialtyID`, `semesterID`, `subjectID`, `teacherID`) VALUES
(1,1,6,1),
(1,1,8,1),
(1,1,4,2),
(1,1,5,2),
(2,1,7,3),
(2,1,2,6),
(2,1,4,2),
(2,1,5,2);

INSERT INTO AmountHours (curriculumID, type_lessonID, amount_hours) VALUES
(1, 1, 36),
(1, 2, 24),
(2, 1, 36),
(2, 2, 24),
(3, 1, 36),
(3, 2, 24),
(4, 1, 36),
(4, 2, 24),
(5, 1, 36),
(5, 2, 24),
(6, 1, 36),
(6, 2, 24);

select * from Сurriculum;
truncate Сurriculum;
DELETE FROM Сurriculum;

INSERT INTO `Audience` (`number_audience`, `building`, `amount_seats`) VALUES
(314, 5, 50),
(1, 4, 150),
(201, 7, 40),
(319, 5, 45),
(122, 5, 60);

INSERT INTO `Schedules` (`number_lesson`, `number_week`, `dayID`, `groupID`,
						 `teacherID`, `subjectID`, `type_lessonID`, `semesterID`,
                         `specialtyID`) VALUES
(1,1,1,'TV-51', 1, 1, 1, 1, 1),
(2,1,1,'TV-51', 1, 1, 2, 1, 1),
(3,1,1,'TV-51', 2, 3, 1, 1, 1),
(1,1,1,'TR-61', 6, 7, 1, 1, 2),
(2,1,1,'TR-61', 6, 8, 2, 1, 2),
(3,1,1,'TR-61', 6, 9, 1, 1, 2),
(1,1,1,'TO-31', 4, 5, 1, 1, 3),
(2,1,1,'TO-31', 4, 6, 2, 1, 3),
(3,1,1,'TO-31', 5, 4, 1, 1, 3);
delete from Schedules;
truncate Schedules;

Select * from Specialty;

SELECT Specialty.spec_name, Un_group.course, Un_group.amount_students
FROM Un_group
LEFT JOIN Specialty ON Un_group.specialtyID = Specialty.id
ORDER BY Un_group.course;

select Specialty.spec_name, 
	   Un_group.id as 'group',
       number_lesson, 
       number_week, 
       Date_day.day, 
       TypeLesson.name as 'type_lesson',
       Subjects.subject_name, 
       concat(Teacher.surname, ' ', left(Teacher.name, 1), '.', left(Teacher.lastname, 1), '.') as 'teacher',  
       Semester.number_semester as 'semester' from Schedules
join Specialty on Schedules.specialtyID = Specialty.id
join Un_group on Schedules.groupID = Un_group.id
join Subjects on Schedules.subjectID = Subjects.id
join Date_day on Schedules.dayID = Date_day.id
join TypeLesson on Schedules.type_lessonID = TypeLesson.id
join Teacher on Schedules.teacherID = Teacher.id
join Semester on Schedules.semesterID = Semester.number_semester;

select Сurriculum.id,
	   Specialty.spec_name,
       Semesters.number_semester,
       Subjects.subject_name, 
       concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.') as 'teacher'  
       from Сurriculum
join Specialty on Сurriculum.specialtyID = Specialty.id
join Semesters on Сurriculum.semesterID = Semesters.number_semester
join Subjects on Сurriculum.subjectID = Subjects.id
join Teachers on Сurriculum.teacherID = Teachers.id;

select AmountHours.curriculumID,
	   Specialty.spec_name,
       Semesters.number_semester,
       Subjects.subject_name, 
       concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.') as 'teacher', 
       TypeLesson.name,
       AmountHours.amount_hours
       from AmountHours
join Сurriculum on Сurriculum.id = AmountHours.curriculumID
join Specialty on Specialty.id = Сurriculum.specialtyID
join Semesters on Semesters.number_semester = Сurriculum.semesterID
join Subjects on Subjects.id = Сurriculum.subjectID
join Teachers on Teachers.id = Сurriculum.teacherID
join TypeLesson on TypeLesson.id = AmountHours.type_lessonID;

select GROUP_CONCAT('\`', 
	json_object('type_lesson',TypeLesson.name, 
					'amount_hours', AmountHours.amount_hours), '\`'
	) as types
from AmountHours
join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
join Сurriculum on Сurriculum.id = AmountHours.curriculumID
where Сurriculum.id = AmountHours.curriculumID;

select json_object(
  'id',  Сurriculum.id,
  'subject_id', Subjects.id,
  'teacher_id', Teachers.id,
  'subject', Subjects.subject_name,
  'teacher', concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.'),
  'types_lesson', json_array(
		(select GROUP_CONCAT('\`', 
								json_object('type_lesson',TypeLesson.name, 
											'amount_hours', AmountHours.amount_hours), '\`'
		)
		from AmountHours
		join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
		where Сurriculum.id = AmountHours.curriculumID))) as curriculum
from Сurriculum
join Subjects on Subjects.id = Сurriculum.subjectID
join Teachers on Teachers.id = Сurriculum.teacherID
WHERE Сurriculum.semesterID = 1 and Сurriculum.specialtyID = 2;


select spec_name from Specialty
where id in (select specialtyID from Un_group 
			 where amount_students > 20);

select spec_name, sum(Un_group.amount_students) as 'Amount_students' from Un_group
left join Specialty on Un_group.specialtyID = Specialty.id
group by spec_name;
