const dbConnection = require("../utility/helper");
const { ObjectId } = require("mongodb");

const createStudent = async(req, res) => {
    console.log(req.body);

    // Connecting to the DB
    const db = await dbConnection();
    const student = await db.collection("students").insertOne(req.body);

    console.log(student);
    res.status(200).json({ msg: "Student Created succefully...", student });
};

const changeMentor = async(req, res) => {
    console.log(req.params, req.query);

    const { studentId } = req.params; // Student ID to be changed
    const { mentorId } = req.query; // Mentor to be assigned/changed

    // Connecting to the DB
    const db = await dbConnection();
    const student = db.collection("students").findOne(ObjectId(studentId));

    if (student.mentor) {
        const oldMentorId = student.mentor.mentorId; // Student Old Mentor ID
        const oldMentor = await db
            .collection("mentors")
            .updateOne({ _id: oldMentorId }, { $pull: { students: { studentId: studentId } } });
    }

    // Updating the Student ID in the New Mentor
    const studentArr = {
        studentId: studentId,
        studentName: student.studentName,
    };
    const newMentor = await db
        .collection("mentors")
        .updateOne({ _id: ObjectId(mentorId) }, { $push: { students: studentArr } });

    const mentorObj = { mentorId: ObjectId(mentorId) };
    const updatedStudent = await db
        .collection("students")
        .updateOne({ _id: ObjectId(studentId) }, { $set: { mentor: mentorObj } });

    res
        .status(200)
        .json({ msg: "Mentor Changed successfully...", updatedStudent });
};

module.exports = { createStudent, changeMentor };