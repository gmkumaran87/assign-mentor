const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
const mentorRouter = require("./routes/mentor");
const studentRouter = require("./routes/student");

app.use("/api/v1/mentor", mentorRouter);
app.use("/api/v1/student", studentRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Mentor assigning app...!");
});

const port = process.env.PORT;

const start = () => {
    app.listen(port, () => console.log("App started in the Port - ", port));
};

start();