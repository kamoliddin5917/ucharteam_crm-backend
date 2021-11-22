const pg = require("../utils/pg");

module.exports = {
  GET: async (_, res) => {
    const teachers = await pg("SELECT * FROM teachers");
    if (!teachers.rows.length)
      return res.status(500).json({ message: "Not found!" });
    return res.status(200).json({ message: "ok", data: teachers.rows });
  },
  POST: async (req, res) => {
    const { firstName, lastName, course } = req.body;
    if (!firstName || !lastName || !course)
      return res.status(400).json({ message: "Bad request!" });

    const teacher = await pg(
      "INSERT INTO teachers(teacher_firstname, teacher_lastname, teacher_ref_course) VALUES ($1, $2, $3) RETURNING *",
      firstName,
      lastName,
      course
    );
    if (!teacher.rows.length)
      return res.status(500).json({ message: "Not found!" });
    return res.status(200).json({ message: "ok", data: teacher.rows });
  },
  PUT: async (req, res) => {
    const { teacherId } = req.params;
    const { firstName, lastName, course } = req.body;
    if (!teacherId || (!firstName && !lastName && !course))
      return res.status(400).json({ message: "Bad request!" });

    const findTeacher = await pg(
      "SELECT teacher_firstname, teacher_lastname, teacher_ref_course FROM teachers WHERE teacher_id = $1",
      teacherId
    );

    if (!findTeacher.rows.length)
      return res.status(500).json({ message: "Not found!" });

    const changeTeacher = await pg(
      `UPDATE teachers SET teacher_firstname = $1, teacher_lastname = $2, teacher_ref_course = $3 
         WHERE teacher_id = $4 RETURNING *`,
      firstName ? firstName : findTeacher.rows[0].teacher_firstname,
      lastName ? lastName : findTeacher.rows[0].teacher_lastname,
      course ? course : findTeacher.rows[0].teacher_ref_course,
      teacherId
    );

    if (!changeTeacher.rows.length)
      return res.status(500).json({ message: "Not changed!" });
    return res
      .status(201)
      .json({ message: "changeTeacher", data: changeTeacher.rows });
  },
  DELETE: async (req, res) => {
    const { teacherId } = req.params;
    if (!teacherId) return res.status(400).json({ message: "Bad request!" });

    const deleteTeacher = await pg(
      "DELETE FROM teachers WHERE teacher_id = $1 RETURNING *",
      teacherId
    );
    if (!deleteTeacher.rows.length)
      return res.status(500).json({ message: "Not delete!" });
    res
      .status(200)
      .json({ message: "Deleted teacher", data: deleteTeacher.rows });
  },
};
