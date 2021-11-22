const { Router } = require("express");
const router = Router();

const homeController = require("../controllers/home");
const loginController = require("../controllers/login");
const dashboardController = require("../controllers/course");
const studentController = require("../controllers/studen");
const teacherController = require("../controllers/teacher");
const groupController = require("../controllers/group");

router.get("/teacher", teacherController.GET);
router.get("/group", groupController.GET);
router.get("/login", loginController.GET);
router.get("/ucharteam", homeController.GET_INFORM);
router.get("/student/:studentId?", studentController.GET);
router.get("/:courseId?", homeController.GET);

router.post("/dashboard", dashboardController.COURSE_POST);
router.post("/student", studentController.POST);
router.post("/teacher", teacherController.POST);
router.post("/group", groupController.POST);

router.put("/dashboard/:courseId", dashboardController.COURSE_PUT);
router.put("/student/:studentId", studentController.PUT);
router.put("/student/pay/:studentId", homeController.PUT);
router.put("/teacher/:teacherId", teacherController.PUT);
router.put("/group/:groupId", groupController.PUT);

router.delete("/dashboard/:courseId", dashboardController.COURSE_DELETE);
router.delete("/student/:studentId", studentController.DELETE);
router.delete("/teacher/:teacherId", teacherController.DELETE);
router.delete("/group/:groupId", groupController.DELETE);

module.exports = router;
