const pg = require("../utils/pg");

module.exports = {
  GET: async (req, res) => {
    const { courseId } = req.params;
    if (courseId) {
      const courses = await pg(
        `   SELECT 
        *,
      CASE
           WHEN pay = price  THEN 'to''landi'
           WHEN pay > price  THEN 'qarz ucharteam'
           WHEN pay < price THEN 'qarz student'
      END payment
      FROM 
      ( SELECT
              course_name AS course, course_price AS price,
              student_firstname AS frist_name, student_lastname AS last_name, student_pay AS pay
              FROM courses LEFT JOIN students ON courses.course_id = students.student_course
              WHERE courses.course_id = $1 ) as students
      ORDER BY pay;`,
        courseId
      );
      if (!courses.rows.length)
        return res.status(500).json({ message: "Not found!" });
      return res.status(200).json({ message: "ok", data: courses.rows });
    }
    const courses = await pg(
      ` SELECT 
      *,
    CASE
         WHEN pay = price  THEN 'to''landi'
         WHEN pay > price  THEN 'qarz ucharteam'
         WHEN pay < price THEN 'qarz student'
    END payment
    FROM 
     ( SELECT
          course_name AS course, course_price AS price,
          student_firstname AS frist_name, student_lastname AS last_name, student_pay AS pay
          FROM courses LEFT JOIN students ON courses.course_id = students.student_course ) as students
    ORDER BY pay`
    );
    if (!courses.rows.length)
      return res.status(500).json({ message: "Not found!" });
    return res.status(200).json({ message: "ok", data: courses.rows });
  },
  GET_INFORM: async (_, res) => {
    const courses = await pg("SELECT * FROM courses");
    const teachers = await pg("SELECT * FROM teachers");
    const groups = await pg("SELECT * FROM groups");
    const students = await pg("SELECT * FROM students");
    if (
      !courses.rows.length ||
      !teachers.rows.length ||
      !groups.rows.length ||
      !students.rows.length
    )
      return res.status(500).json({ message: "Not found!" });
    res.status(200).json({
      message: "ok",
      data: {
        courses: courses.rows,
        teachers: teachers.rows,
        groups: groups.rows,
        students: students.rows,
      },
    });
  },
  PUT: async (req, res) => {
    const { studentId } = req.params;
    const { pay } = req.body;
    if (!studentId || !pay)
      return res.status(400).json({ message: "Bad request!" });
    if (isNaN(pay)) return res.status(400).json({ message: "Bad request!" });

    const findStudent = await pg(
      "SELECT student_pay FROM students WHERE student_id = $1",
      studentId
    );

    if (!findStudent.rows.length)
      return res.status(500).json({ message: "Not found!" });

    const payment = +pay + +findStudent.rows[0].student_pay;

    if (isNaN(payment)) return res.status(500).json({ message: "Not change!" });

    const changePay = await pg(
      `UPDATE students SET student_pay = $1 WHERE student_id = $2 RETURNING *`,
      payment,
      studentId
    );

    if (!changePay.rows.length)
      return res.status(500).json({ message: "Not changed!" });
    return res.status(201).json({ message: "payment", data: changePay.rows });
  },
};
