SELECT * FROM courses;

SELECT * FROM teachers;

SELECT * FROM groups;

SELECT * FROM students;

SELECT * FROM  students LIMIT 2;


UPDATE 
    students 
SET 
    WHEN 
        null IS NULL THEN ( SELECT student_firstname FROM students WHERE student_id = '3e9161b2-cec0-4314-8873-70dc8fd75696')
    ELSE 
         student_firstname = 'K'
    END duration
    student_pay = 1
WHERE
    student_id = '3e9161b2-cec0-4314-8873-70dc8fd75696';


UPDATE
	students
	SET student_firstname = (
		WHEN student_firstname = 'undifined' THEN
			student_firstname
		ELSE
			'Jasc')
WHERE
	student_id = '3e9161b2-cec0-4314-8873-70dc8fd75696' RETURNING *;





    SELECT 
        *,
       CASE
           WHEN pay = price  THEN 'to''landi'
           WHEN pay > price  THEN 'qarz course'
           WHEN pay < price THEN 'qarz student'
       END payment
FROM 
       ( SELECT
              course_name AS course, course_price AS price,
              student_firstname AS frist_name, student_lastname AS last_name, student_pay AS pay
              FROM courses LEFT JOIN students ON courses.course_id = students.student_course ) as students
ORDER BY pay;

SELECT 
        *,
       CASE
           WHEN pay = price  THEN 'to''landi'
           WHEN pay < price THEN ((price - pay) as b) 
       END payment
FROM 
       ( SELECT
              course_name AS course, course_price AS price,
              student_firstname AS frist_name, student_lastname AS last_name, student_pay AS pay
              FROM courses LEFT JOIN students ON courses.course_id = students.student_course
              WHERE courses.course_id = '290d3cdc-7e2b-4a00-a490-7b6cbc921f2a' ) as students
ORDER BY pay;