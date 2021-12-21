const express = require("express");
const {
    getAllStudents,
    createMentor,
    assignMentor,
} = require("../controllers/mentor");

const router = express.Router();

router.route("/create-mentor").post(createMentor);
router.route("/:mentorId").get(getAllStudents).post(assignMentor);

module.exports = router;