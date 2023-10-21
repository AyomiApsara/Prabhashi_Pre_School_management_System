const express = require("express");
const router = express.Router();
const { Attendance } = require("../models");
const { Student } = require("../models");
router.get("/", async (req, res) => {
  console.log('dddddddddddd')
  const listOfAttendance = await Attendance.findAll({
    include: {
      model: Student,
      attributes: ["studentId", "fullname"], // Include only specific attributes of the Student model
    },
  });
  console.log(listOfAttendance)
  res.json(listOfAttendance);
});

router.get("/attendance", async (req, res) => {
  const listOfAttendance = await Attendance.findAll({
    attributes: ["date"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfAttendance);
});

router.post("/", async (req, res) => {
  const attendance = req.body;
  delete attendance.attendanceId; 
  const createdAttendance = await Attendance.create(attendance);
  res.json(createdAttendance);
});

router.get("/attendanceDetails", async (req, res) => {
  const listOfgradees = await Attendance.findAll({
    attributes: ["date", "attendanceId"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfgradees);
});

module.exports = router;
