const pg = require("../utils/pg");

module.exports = {
  GET: async (_, res) => {
    const groups = await pg("SELECT * FROM groups");
    if (!groups.rows.length)
      return res.status(500).json({ message: "Not found!" });
    return res.status(200).json({ message: "ok", data: groups.rows });
  },
  POST: async (req, res) => {
    const { name, teacher } = req.body;
    if (!name || !teacher)
      return res.status(400).json({ message: "Bad request!" });

    const group = await pg(
      "INSERT iNTO groups(group_name, group_ref_teacher) VALUES ($1, $2) RETURNING *",
      name,
      teacher
    );
    if (!group.rows.length)
      return res.status(500).json({ message: "Not found!" });
    return res.status(200).json({ message: "ok", data: group.rows });
  },
  PUT: async (req, res) => {
    const { groupId } = req.params;
    const { name, teacher } = req.body;
    if (!groupId || (!name && !teacher))
      return res.status(400).json({ message: "Bad request!" });

    const findGroup = await pg(
      "SELECT group_name, group_ref_teacher FROM groups WHERE group_id = $1",
      groupId
    );

    if (!findGroup.rows.length)
      return res.status(500).json({ message: "Not found!" });

    const changeGroup = await pg(
      "UPDATE groups SET group_name = $1, group_ref_teacher = $2 WHERE group_id = $3 RETURNING *",
      name ? name : findGroup.rows[0].group_name,
      teacher ? teacher : findGroup.rows[0].group_ref_teacher,
      groupId
    );

    if (!changeGroup.rows.length)
      return res.status(500).json({ message: "Not changed!" });
    return res
      .status(201)
      .json({ message: "changeGroup", data: changeGroup.rows });
  },
  DELETE: async (req, res) => {
    const { groupId } = req.params;
    if (!groupId) return res.status(400).json({ message: "Bad request!" });

    const deleteGroup = await pg(
      "DELETE FROM groups WHERE group_id = $1 RETURNING *",
      groupId
    );
    if (!deleteGroup.rows.length)
      return res.status(500).json({ message: "Not delete!" });
    res.status(200).json({ message: "Deleted group", data: deleteGroup.rows });
  },
};
