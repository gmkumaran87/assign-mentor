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

    const newStudentsId = studentsId.map((el) => ObjectId(el));

    const db = await dbConnection();

    // Getting the Mentor name from the DB
    const mentor = await db
        .collection("mentors")
        .findOne({ _id: ObjectId(mentorId) });

    const mentorObj = {
        mentorId: ObjectId(mentorId),
        mentorName: mentor.mentorName,
    };

    // Updating the Mentor details in the given Students
    const students = await db
        .collection("students")
        .updateMany({ _id: { $in: newStudentsId } }, { $set: { mentor: mentorObj } });

    // Getting the updated students name
    const updatedStudents = await db
        .collection("students")
        .find({ _id: { $in: newStudentsId } })
        .toArray();

    // Creating student object
    const studentObj = updatedStudents.map((el) => ({
        studentId: el._id,
        studentName: el.studentName,
    }));

    // Updating the Mentor docuemnt with Student details
    const updateMentor = await db
        .collection("mentors")
        .updateOne({ _id: ObjectId(mentorId) }, { $set: { students: studentObj } });

    res.json({ msg: "New Students", studentObj, updateMentor });
};
module.exports = { createMentor, getAllStudents, assignMentor };