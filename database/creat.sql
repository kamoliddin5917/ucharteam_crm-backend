CREATE DATABASE ucharteam_crm;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE courses(
    course_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    course_name text NOT NULL,
    course_price iNT default 0,
    course_date timestamp with time zone not null default current_timestamp,
    course_ref_id uuid default NULL,
      CONSTRAINT fk_course_course
        FOREIGN KEY(course_ref_id)
            REFERENCES courses(course_id)
            ON DELETE CASCADE
);

CREATE TABLE teachers(
    teacher_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    teacher_firstname VARCHAR(50) NOT NULL,
    teacher_lastname VARCHAR(50) NOT NULL,
    teacher_date timestamp with time zone not null default current_timestamp,
    teacher_ref_course uuid NOT NULL,
        CONSTRAINT fk_teacher_course
        FOREIGN KEY(teacher_ref_course)
            REFERENCES courses(course_id)
            ON DELETE CASCADE
);

CREATE TABLE groups(
    group_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    group_name text NOT NULL,
    group_date timestamp with time zone not null default current_timestamp,
    group_ref_teacher uuid NOT NULL,
        CONSTRAINT fk_group_teacher
        FOREIGN KEY(group_ref_teacher)
            REFERENCES teachers(teacher_id)
            ON DELETE CASCADE
);

CREATE TABLE students(
    student_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    student_firstname VARCHAR(50) NOT NULL,
    student_lastname VARCHAR(50) NOT NULL,
    student_pay iNT default 0,
    student_date timestamp with time zone not null default current_timestamp,
    student_course uuid NOT NULL,
      CONSTRAINT fk_student_course
        FOREIGN KEY(student_course)
            REFERENCES courses(course_id)
            ON DELETE CASCADE,
    student_group uuid NOT NULL,
      CONSTRAINT fk_student_group
        FOREIGN KEY(student_group)
            REFERENCES groups(group_id)
            ON DELETE CASCADE
);

