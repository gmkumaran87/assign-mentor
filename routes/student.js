const express = require("express");
const { createStudent, changeMentor } = require("../controllers/student");

const router = express.Router();

router.route("/create-student").post(createStudent);
router.route("/:studentId").patch(changeMentor);

module.exports = router;