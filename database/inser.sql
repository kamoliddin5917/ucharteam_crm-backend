INSERT INTO courses(course_name, course_price) VALUES
('WEB-DASTURLASH', 15000000),
('WEB-DIZAYN', 9000000),
('GRAFIK-DIZAYN', 8000000),
('MOUSHN-GRAFICASI', 9000000),
('MOBIL-DASTURLASH', 10000000),
('SMM', 4000000);

INSERT INTO courses(course_name, course_price, course_ref_id) VALUES
('Frontend', 5000000,'a5691bdc-062f-4687-a5fe-8a009fd4c042'),
('Backend', 10000000,'a5691bdc-062f-4687-a5fe-8a009fd4c042'),
('Logotip', 4000000,'cbe1c379-6c73-4944-8763-8afea873193e'),
('Photo', 4000000,'cbe1c379-6c73-4944-8763-8afea873193e'),
('Android', 4000000,'c3fc7d02-5728-4000-980d-814c3af8f229'),
('Ios', 6000000,'c3fc7d02-5728-4000-980d-814c3af8f229');

INSERT INTO courses(course_name, course_price, course_ref_id) VALUES
('html&css', 1500000,'ca337a68-62bd-4335-b8eb-2c23f373491a'),
('javascript', 3000000,'ca337a68-62bd-4335-b8eb-2c23f373491a'),
('git&github', 500000,'ca337a68-62bd-4335-b8eb-2c23f373491a'),
('nodejs', 5000000,'47b1a80f-83aa-4efc-9648-4d36e46fa4fb'),
('express', 1000000,'47b1a80f-83aa-4efc-9648-4d36e46fa4fb'),
('graphql', 1000000,'47b1a80f-83aa-4efc-9648-4d36e46fa4fb'),
('postgresql', 1000000,'47b1a80f-83aa-4efc-9648-4d36e46fa4fb'),
('mongodb', 1000000,'47b1a80f-83aa-4efc-9648-4d36e46fa4fb'),
('servergajoylash', 1000000,'47b1a80f-83aa-4efc-9648-4d36e46fa4fb');

INSERT INTO teachers(teacher_firstname, teacher_lastname, teacher_ref_course) VALUES
('Umar', 'Umirzakov', 'ca337a68-62bd-4335-b8eb-2c23f373491a'),
('Shuhratbek', 'Qobulov', 'ca337a68-62bd-4335-b8eb-2c23f373491a'),
('Usmon', 'Ma''sudjonov', '47b1a80f-83aa-4efc-9648-4d36e46fa4fb'),
('Baxtiyor', 'Umarov', '47b1a80f-83aa-4efc-9648-4d36e46fa4fb');

INSERT iNTO groups(group_name, group_ref_teacher) VALUES
('Uchar', 'bf44f07a-0f48-4676-9fcd-e1f1ba06f17f'),
('Bosar', '03b86c42-337b-4b40-ac94-20ee50d4e2d6'),
('O''zar', '9a6f0509-fc73-45f3-89aa-4414e2eafc53'),
('Yorar', '6095e3a0-fbf9-4872-9c9e-74a5dd17e26b');

INSERT INTO students(student_firstname, student_lastname, student_pay, student_course, student_group) VALUES
('Kamoliddin', 'Jamoliddinov', 15000000, 'a5691bdc-062f-4687-a5fe-8a009fd4c042', 'f8665936-ffd7-4e22-968f-0166f2007131'),
('Durdona', 'Jamoliddinova', 15000000, 'a5691bdc-062f-4687-a5fe-8a009fd4c042', 'f8665936-ffd7-4e22-968f-0166f2007131');

INSERT INTO students(student_firstname, student_lastname, student_pay, student_course, student_group) VALUES
('Umida', 'Hanimqulova', 9000000, 'ca337a68-62bd-4335-b8eb-2c23f373491a', '9e985ac1-82fd-44db-96f3-24de6fd78d2d'),
('Shoista', 'Abdujabborova', 1000000, 'ca337a68-62bd-4335-b8eb-2c23f373491a', '9e985ac1-82fd-44db-96f3-24de6fd78d2d');

INSERT INTO students(student_firstname, student_lastname, student_course, student_group) VALUES
('Malika', 'Murodova', 'ca337a68-62bd-4335-b8eb-2c23f373491a', '198b0dc2-8a18-46a7-8540-7c1b797aacb8'),
('Sevara', 'Murodova', '47b1a80f-83aa-4efc-9648-4d36e46fa4fb', 'b50fabd2-e9ae-4a1d-8ad4-fd405839cfeb'),
('Sevinch', 'Valiyeva', '47b1a80f-83aa-4efc-9648-4d36e46fa4fb', 'b50fabd2-e9ae-4a1d-8ad4-fd405839cfeb');
