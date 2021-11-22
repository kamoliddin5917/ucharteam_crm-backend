const pg = require("../utils/pg");

module.exports = {
  GET: async (req, res) => {
    const { studentId } = req.params;
    if (studentId) {
      const student = await pg(
        `SELECT
        course_name AS course, course_price AS price,
        student_firstname AS frist_name, student_lastname AS last_name, student_pay AS pay
        FROM courses INNER JOIN students ON courses.course_id = students.student_course
        WHERE students.student_id = $1`,
        studentId
      );
      if (!student.rows.length)
        return res.status(500).json({ message: "Not found!" });
      return res.status(200).json({ message: "ok", data: student.rows });
    }
    const students = await pg(
      `SELECT
            course_name AS course, course_price AS price,
            student_firstname AS frist_name, student_lastname AS last_name, student_pay AS pay
            FROM courses INNER JOIN students ON courses.course_id = students.student_course`
    );
    if (!students.rows.length)
      return res.status(500).json({ message: "Not found!" });
    return res.status(200).json({ message: "ok", data: students.rows });
  },
  POST: async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, pay, course, group } = req.body;
    if (!firstName || !lastName || !course || !group)
      return res.status(400).json({ message: "Bad request!" });
    if (pay) {
      if (isNaN(pay)) return res.status(400).json({ message: "Bad request!" });
      const data = await pg(
        "INSERT INTO students(student_firstname, student_lastname, student_pay, student_course, student_group) VALUES($1,$2,$3,$4,$5) RETURNING *",
        firstName,
        lastName,
        pay,
        course,
        group
      );
      if (!data.rows.length)
        return res.status(500).json({ message: "Not created!" });
      return res.status(200).json({ message: "created", data: data.rows });
    }
    const data = await pg(
      "INSERT INTO students(student_firstname, student_lastname, student_course, student_group) VALUES ($1,$2,$3,$4) RETURNING *",
      firstName,
      lastName,
      course,
      group
    );
    if (!data.rows.length)
      return res.status(500).json({ message: "Not created!" });
    return res.status(200).json({ message: "created", data: data.rows });
  },
  PUT: async (req, res) => {
    const { studentId } = req.params;
    const { firstName, lastName, pay, course, group } = req.body;
    if (!studentId || (!firstName && !lastName && !pay && !course && !group))
      return res.status(400).json({ message: "Bad request!" });
    if (pay && isNaN(pay))
      return res.status(400).json({ message: "Bad request!" });

    const findStudent = await pg(
      "SELECT student_firstname, student_lastname, student_pay, student_course, student_group FROM students WHERE student_id = $1",
      studentId
    );

    if (!findStudent.rows.length)
      return res.status(500).json({ message: "Not found!" });

    const changeCourse = await pg(
      `UPDATE students SET student_firstname = $1, student_lastname = $2, student_pay = $3, student_course = $4, student_group = $5 
       WHERE student_id = $6 RETURNING *`,
      firstName ? firstName : findStudent.rows[0].student_firstname,
      lastName ? lastName : findStudent.rows[0].student_lastname,
      pay ? pay : findStudent.rows[0].student_pay,
      course ? course : findStudent.rows[0].student_course,
      group ? group : findStudent.rows[0].student_group,
      studentId
    );

    if (!changeCourse.rows.length)
      return res.status(500).json({ message: "Not changed!" });
    return res
      .status(201)
      .json({ message: "changeCourse", data: changeCourse.rows });
  },
  DELETE: async (req, res) => {
    const { studentId } = req.params;
    if (!studentId) return res.status(400).json({ message: "Bad request!" });

    const deleteStudent = await pg(
      "DELETE FROM students WHERE student_id = $1 RETURNING *",
      studentId
    );
    if (!deleteStudent.rows.length)
      return res.status(500).json({ message: "Not delete!" });
    res
      .status(200)
      .json({ message: "Deleted student", data: deleteStudent.rows });
  },
};
