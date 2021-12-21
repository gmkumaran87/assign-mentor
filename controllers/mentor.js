const { ObjectId } = require("mongodb");
const dbConnection = require("../utility/helper");

const createMentor = async(req, res) => {
    console.log(req.body);

    const db = await dbConnection();
    const mentor = await db.collection("mentors").insertOne(req.body);
    res.status(200).json({ msg: "Mentor created successfully...", mentor });
};

const getAllStudents = async(req, res) => {
    const { mentorId } = req.params; // Mento ID students to be shown
    const db = await dbConnection();
    const mentor = await db
        .collection("mentors")
        .findOne({ _id: ObjectId(mentorId) });
    res.status(200).json({ msg: "List of students", students: mentor.students });
};

const assignMentor = async(req, res) => {
    const { mentorId } = req.params; // Mento ID students to be shown
    const { studentsId } = req.body;

    console.log(studentsId, mentorId);
    res.send("assigning mentors");
};
module.exports = { createMentor, getAllStudents, assignMentor };