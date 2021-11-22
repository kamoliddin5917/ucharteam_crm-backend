const pg = require("../utils/pg");

module.exports = {
  COURSE_POST: async (req, res) => {
    const { course, price, id } = req.body;
    if (!course || !price)
      return res.status(400).json({ message: "Bad request!" });
    if (isNaN(price)) return res.status(400).json({ message: "Bad request!" });

    if (id) {
      const data = await pg(
        "INSERT INTO courses(course_name, course_price, course_ref_id) VALUES($1, $2, $3) RETURNING *",
        course,
        price,
        id
      );
      if (!data.rows.length)
        return res.status(500).json({ message: "Not created!" });
      return res.status(200).json({ message: "created", data: data.rows });
    }
    const data = await pg(
      "INSERT INTO courses(course_name, course_price) VALUES($1, $2) RETURNING *",
      course,
      price
    );
    if (!data.rows.length)
      return res.status(500).json({ message: "Not created!" });
    return res.status(200).json({ message: "created", data: data.rows });
  },
  COURSE_PUT: async (req, res) => {
    const { courseId } = req.params;
    const { course, price } = req.body;
    if (!courseId || (!course && !price))
      return res.status(400).json({ message: "Bad request!" });

    if (price && isNaN(price))
      return res.status(400).json({ message: "Bad request!" });

    const findCourse = await pg(
      "SELECT course_name, course_price FROM courses WHERE course_id = $1",
      courseId
    );
    if (!findCourse.rows.length)
      return res.status(500).json({ message: "Not found!" });

    const changeCourse = await pg(
      "UPDATE courses SET course_name = $1, course_price = $2 WHERE course_id = $3 RETURNING *",
      course ? course : findCourse.rows[0].course_name,
      price ? price : findCourse.rows[0].course_price,
      courseId
    );
    if (!changeCourse.rows.length)
      return res.status(500).json({ message: "Not changed!" });
    return res
      .status(201)
      .json({ message: "changeCourse", data: changeCourse.rows });
  },
  COURSE_DELETE: async (req, res) => {
    const { courseId } = req.params;
    if (!courseId) return res.status(400).json({ message: "Bad request!" });
    const deleteCourse = await pg(
      "DELETE FROM courses WHERE course_id = $1 RETURNING *",
      courseId
    );
    if (!deleteCourse.rows.length)
      return res.status(500).json({ message: "Not delete!" });
    res
      .status(200)
      .json({ message: "Deleted Course", data: deleteCourse.rows });
  },
};
