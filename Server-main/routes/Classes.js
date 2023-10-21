const express = require("express");
const router = express.Router();
const { Grade } = require("../models");
const { Teacher } = require("../models");
router.get("/", async (req, res) => {
  const listOfGrade = await Grade.findAll({
    include: {
      model: Teacher,
      attributes: ["teacherId", "fullname"], // Include only specific attributes of the Teacher model
    },
  });
  res.json(listOfGrade);
});

router.get("/grade", async (req, res) => {
  const listOfGrade = await Grade.findAll({
    attributes: ["gradeName"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfGrade);
});

router.post("/", async (req, res) => {
  const grader = req.body;
  delete grader.gradeId; 
  const createdGrade = await Grade.create(grader);
  res.json(createdGrade);
});

router.get("/gradeDetails", async (req, res) => {
  const listOfgradees = await Grade.findAll({
    attributes: ["gradeName", "gradeId"], // Replace 'columnName' with the actual name of the column you want to retrieve
  });
  res.json(listOfgradees);
});

module.exports = router;
