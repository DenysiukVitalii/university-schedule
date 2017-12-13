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
    type_lesson VARCHAR(50) NOT NULL
);


CREATE TABLE Сurriculums (
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
    FOREIGN KEY (curriculumID) REFERENCES Сurriculums(id),
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
    audienceID INT NOT NULL,
    
    FOREIGN KEY (teacherID) REFERENCES Teachers(id),
    FOREIGN KEY (subjectID) REFERENCES Subjects(id),
    FOREIGN KEY (dayID) REFERENCES Date_day(id),
    FOREIGN KEY (groupID) REFERENCES Un_group(id),
    FOREIGN KEY (type_lessonID) REFERENCES TypeLesson(id),
    FOREIGN KEY (semesterID) REFERENCES Semesters(number_semester),
    FOREIGN KEY (audienceID) REFERENCES Audience(id),
    
	UNIQUE(id) 
);

INSERT INTO `Specialty` (`spec_name`) VALUES
('Програмна інженерія');

INSERT INTO `Specialty` (`spec_name`) VALUES
('Software Engineering'),
('Computer Science'),
('Hardware Engineering');
select * from Specialty;
UPDATE Specialty SET spec_name = 'testaa' WHERE id = 4;


INSERT INTO `Date_day` (`day`) VALUES
('Monday'),
('Tuesday'),
('Wednesday'),
('Thursday'),
('Friday'),
('Saturday');

INSERT INTO `Un_group` (`id`, `specialtyID`, `course`, `amount_students`) VALUES
('TP-21', 1, 6, 20),
('TR-31', 2, 5, 22),
('TE-21', 1, 6, 20),
('TK-31', 2, 5, 22),
('TV-51', 1, 3, 20),
('TR-61', 2, 2, 22),
('TO-31', 3, 4, 17),
('IP-52', 1, 3, 16),
('KT-61', 2, 2, 21),
('BN-31', 3, 4, 20);
truncate Un_group;
select * from Audience;

SELECT Un_group.id, course, amount_students FROM Un_group, Specialty
WHERE specialtyID=Specialty.id AND specialtyID=2;

CREATE OR REPLACE VIEW group_view AS
SELECT Un_group.id, spec_name, course, amount_students FROM Un_group, Specialty
WHERE specialtyID=Specialty.id AND course > 4 WITH CHECK OPTION;

SELECT * FROM group_view WHERE amount_students > 21;

UPDATE group_view SET amount_students=19 WHERE id='TP-21';
UPDATE group_view SET course=6 WHERE id='TP-21';

DROP VIEW group_view;

select * from Date_day;
delete from Date_day;
truncate Date_day;

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

start transaction;
INSERT INTO `Teachers` (`surname`, `name`, `lastname`, `position`, `rank`, `phone`) VALUES
('Pupkin', 'Vasya', 'Yurievich', 'Software developer', 'Docent', '0678926323');
select * from Teachers;
rollback;
select * from Teachers;

delimiter $$ 
drop procedure if exists teacher_cursor $$
create procedure teacher_cursor()
begin 
	declare v_surname varchar(50);
    declare v_name varchar(50);
    declare v_phone varchar(20);
    declare done integer default 0;
    declare c1 cursor for select surname, name, phone from Teachers;
    declare continue handler for NOT FOUND set done = 1;
    open c1;
		get_info: LOOP
			fetch c1 into v_surname, v_name, v_phone;
			if done = 1 then 
				leave get_info;
			end if;
			select concat(v_surname, ' ', v_name) as Teacher, v_phone as Phone;
		END LOOP get_info;
    close c1;
end $$

delimiter ;
SET SQL_SAFE_UPDATES = 1;
call teacher_cursor();

select * from TypeLesson;


INSERT INTO `TypeLesson` (type_lesson) VALUES
('Lecture'),
('Practice'),
('Laboratory');

INSERT INTO Сurriculums (specialtyID, semesterID, subjectID, teacherID) VALUES
(1,1,6,1),
(1,1,8,1),
(1,1,4,2),
(1,1,5,2),
(2,1,7,3),
(2,1,2,6),
(2,1,4,2),
(2,1,5,2);

SELECT * FROM Сurriculums;
delete from Сurriculums where id = 6;

INSERT INTO AmountHours (curriculumID, type_lessonID, amount_hours) VALUES
(1, 1, 36),
(1, 2, 24),
(2, 1, 36),
(2, 2, 24),
(3, 1, 36),
(3, 2, 24),
(4, 1, 36),
(4, 2, 24);


UPDATE AmountHours SET amount_hours = 24    
WHERE curriculumID = 8 and type_lessonID = 1;
INSERT INTO AmountHours (curriculumID, type_lessonID, amount_hours) VALUES
(8, 1, 36);
select * from AmountHours;
truncate Сurriculums;
DELETE FROM Сurriculums;

INSERT INTO `Audience` (`number_audience`, `building`, `amount_seats`) VALUES
(314, 5, 50),
(1, 4, 150),
(201, 7, 40),
(319, 5, 45),
(122, 5, 60);

INSERT INTO `Schedules` (`number_lesson`, `number_week`, `dayID`, `groupID`,
						 `teacherID`, `subjectID`, `type_lessonID`, `semesterID`,
                         `audienceID`) VALUES
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

select Schedules.id,
	   concat(Audience.number_audience, '-', Audience.building) as 'place',
       number_lesson, 
       Date_day.day, 
       TypeLesson.type_lesson as 'type_lesson',
       Subjects.subject_name, 
       concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.') as 'teacher'
       from Schedules
join Audience on Schedules.audienceID = Audience.id
join Un_group on Schedules.groupID = Un_group.id
join Subjects on Schedules.subjectID = Subjects.id
join Date_day on Schedules.dayID = Date_day.id
join TypeLesson on Schedules.type_lessonID = TypeLesson.id
join Teachers on Schedules.teacherID = Teachers.id
join Semesters on Schedules.semesterID = Semesters.number_semester
where Schedules.groupID = 'TV-51'
and Schedules.semesterID = 1;

CREATE OR REPLACE VIEW getScheduleByGroup AS
select Schedules.id,
	   concat(Audience.number_audience, '-', Audience.building) as 'place',
       number_lesson, 
       Date_day.day,
       Schedules.groupID,
       Schedules.semesterID,
       Schedules.number_week,
       TypeLesson.type_lesson as 'type_lesson',
       Subjects.subject_name, 
       concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.') as 'teacher'
       from Schedules
join Audience on Schedules.audienceID = Audience.id
join Un_group on Schedules.groupID = Un_group.id
join Subjects on Schedules.subjectID = Subjects.id
join Date_day on Schedules.dayID = Date_day.id
join TypeLesson on Schedules.type_lessonID = TypeLesson.id
join Teachers on Schedules.teacherID = Teachers.id
join Semesters on Schedules.semesterID = Semesters.number_semester
WITH CHECK OPTION;

SELECT * FROM getScheduleByGroup 
where groupID = 'TV-51'
and number_week = 1;

CREATE OR REPLACE VIEW checkAvailableTeacher AS

select Schedules.id,
	   Schedules.dayID,
       Schedules.teacherID, 
       Schedules.number_lesson, 
       Schedules.number_week
	   from Schedules
join Date_day on Schedules.dayID = Date_day.id
join Teachers on Schedules.teacherID = Teachers.id

WITH CHECK OPTION;

SELECT * FROM checkAvailableTeacher 
where dayID = 1 
and teacherID = 1 
and number_lesson = 1 
and number_week = 1;


CREATE OR REPLACE VIEW checkAvailableAudience AS

select Schedules.id,
	   Schedules.dayID,
       Schedules.audienceID, 
       Schedules.number_lesson, 
       Schedules.number_week
	   from Schedules
join Audience on Schedules.audienceID = Audience.id
join Date_day on Schedules.dayID = Date_day.id
join Teachers on Schedules.teacherID = Teachers.id

WITH CHECK OPTION;

SELECT * FROM checkAvailableAudience 
where dayID = 1 
and audienceID = 1 
and number_lesson = 1 
and number_week = 1;


CREATE OR REPLACE VIEW getCurriculumBySpec AS
select Сurriculums.id,
       Сurriculums.semesterID,
       Сurriculums.specialtyID,
       Сurriculums.subjectID,
       Сurriculums.teacherID,
       Subjects.subject_name, 
       concat(Teachers.surname, ' ',
			  left(Teachers.name, 1), '.', 
			 left(Teachers.lastname, 1), '. (', Teachers.position, ')') as 'teacher'  
       from Сurriculums
join Specialty on Сurriculums.specialtyID = Specialty.id
join Semesters on Сurriculums.semesterID = Semesters.number_semester
join Subjects on Сurriculums.subjectID = Subjects.id
join Teachers on Сurriculums.teacherID = Teachers.id WITH CHECK OPTION;

SELECT * FROM getCurriculumBySpec WHERE 
semesterID = 1 and specialtyID = 1;

CREATE OR REPLACE VIEW getTypesLessonByCurriculum AS
select AmountHours.curriculumID,
		TypeLesson.type_lesson,
       TypeLesson.id,
       AmountHours.amount_hours
       from AmountHours
join Сurriculums on Сurriculums.id = AmountHours.curriculumID
join Specialty on Specialty.id = Сurriculums.specialtyID
join Semesters on Semesters.number_semester = Сurriculums.semesterID
join Subjects on Subjects.id = Сurriculums.subjectID
join Teachers on Teachers.id = Сurriculums.teacherID
join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
WITH CHECK OPTION;
delete from AmountHours where curriculumID = 9;
SELECT * FROM getTypesLessonByCurriculum WHERE curriculumID = 1;


select AmountHours.curriculumID,
	   Specialty.spec_name,
       Semesters.number_semester,
       Subjects.subject_name, 
       concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.') as 'teacher', 
       TypeLesson.type_lesson,
       TypeLesson.id,
       AmountHours.amount_hours
       from AmountHours
join Сurriculums on Сurriculums.id = AmountHours.curriculumID
join Specialty on Specialty.id = Сurriculums.specialtyID
join Semesters on Semesters.number_semester = Сurriculums.semesterID
join Subjects on Subjects.id = Сurriculums.subjectID
join Teachers on Teachers.id = Сurriculums.teacherID
join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
where AmountHours.curriculumID = 1;

select GROUP_CONCAT('\`', 
	json_object('type_lesson',TypeLesson.name, 
					'amount_hours', AmountHours.amount_hours), '\`'
	) as types
from AmountHours
join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
join Сurriculum on Сurriculum.id = AmountHours.curriculumID
where Сurriculum.id = AmountHours.curriculumID;

select json_object(
  'id',  Сurriculums.id,
  'subject_id', Subjects.id,
  'teacher_id', Teachers.id,
  'subject', Subjects.subject_name,
  'teacher', concat(Teachers.surname, ' ', left(Teachers.name, 1), '.', left(Teachers.lastname, 1), '.'),
  'types_lesson', json_array(
		(select GROUP_CONCAT('\`', 
								json_object('type_lesson',TypeLesson.name, 
											'amount_hours', AmountHours.amount_hours,
                                            'selected', true,
                                            'id', AmountHours.curriculumID), '\`'
		)
		from AmountHours
		join TypeLesson on TypeLesson.id = AmountHours.type_lessonID
		where Сurriculums.id = AmountHours.curriculumID))) as curriculum
from Сurriculums
join Subjects on Subjects.id = Сurriculums.subjectID
join Teachers on Teachers.id = Сurriculums.teacherID
WHERE Сurriculums.semesterID = 1 and Сurriculums.specialtyID = 1;


select spec_name from Specialty
where id in (select specialtyID from Un_group 
			 where amount_students > 20);

select spec_name, sum(Un_group.amount_students) as 'Amount_students' from Un_group
left join Specialty on Un_group.specialtyID = Specialty.id
group by spec_name;
