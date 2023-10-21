const express = require("express");
const router = express.Router();
const { Teacher } = require("../models");

router.get("/", async (req, res) => {
  const listOfTeachers = await Teacher.findAll();
  res.json(listOfTeachers);
});

router.post("/", async (req, res) => {
  const teacher = req.body;
  delete teacher.teacherId; 
  const createdTeacher = await Teacher.create(teacher);
  res.json(createdTeacher);
});

router.put("/", async (req, res) => {
  const teacher = req.body;
  const createdTeacher = await Teacher.update({ ...teacher }, {
    where: {
      teacherId: teacher.teacherId
    }
  });;
  res.json(createdTeacher);
});

router.get("/lastId", async (req, res) => {
  const lastTeacher = await Teacher.findOne({
    order: [["teacherId", "DESC"]],
  });
  const lastTeacherId = lastTeacher ? lastTeacher.teacherId : null;
  res.json({ id: lastTeacherId });
});

router.get("/tch", async (req, res) => {
  const listOfteachers = await Teacher.findAll({
    attributes: ["teacherId", "fName"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfteachers);
});

router.get("/teacherList", async (req, res) => {
  const listOfTeachersall = await Teacher.findAll({
    attributes: [
      "teacherId",
      "fName",
      "lName",
      "teacherNIC",
      "teacherNo",
      "teacherEmail",
      "regDate",
    ],
  });
  // Extract the required properties for each student and assign a unique id
  const formattedList = listOfTeachersall.map((teacher, index) => ({
    id: index + 1, // Assign a unique id based on the index (starting from 1)
    teacherId: teacher.teacherId,
    fName: teacher.fName,
    lName: teacher.lName,
    teacherNIC: teacher.teacherNIC,
    teacherNo: teacher.teacherNo,
    teacherEmail: teacher.teacherEmail,
    regDate: teacher.regDate,
  }));
  res.json(formattedList);
});

module.exports = router;
