const express = require("express");
const router = express.Router();
const { Parent,Student, Sequelize } = require("../models");


router.get("/", async (req, res) => {
  const listOfStudents = await Student.findAll();
  res.json(listOfStudents);
});

router.get("/:studentId", async (req, res) => {
  const id = req.params.studentId;
  const student = await Student.findByPk(id);
  const p = await Parent.findByPk(student.parentId);
  student.dataValues.parent = p;
  res.json(student);
}); 

router.get("/delete/:studentId", async (req, res) => {
  const id = req.params.studentId;
  const deletedStudent = await Student.destroy({
    where: { studentId: id }
  });

  if (deletedStudent === 0) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json({ message: "Student deleted successfully" });
}); 

router.get("/byId/:studentId", async (req, res) => {
  const id = req.params.studentId;
  const student = await Student.findByPk(id);
  
  res.json(student);
});

router.get("/lastId", async (req, res) => {
  const lastStudent = await Student.findOne({
    order: [["studentId", "DESC"]],
  });
  const lastStudentId = lastStudent ? lastStudent.studentId : null;
  res.json({ id: lastStudentId });
});

router.get("/classCount", async (req, res) => {
  const classCounts = await Student.findAll({
    attributes: [
      "ClassClassName",
      [Sequelize.fn("COUNT", Sequelize.col("ClassClassName")), "count"],
    ],
    group: ["ClassClassName"],
  });
  const result = classCounts.map(({ ClassClassName, dataValues }) => ({
    className: ClassClassName,
    count: dataValues.count,
  }));
  res.json(result);
});

router.post("/", async (req, res) => {
  const student = req.body;
  delete student.studentId;
  const createdParent = await Parent.create(student.parent);
  console.log("sajit")
  console.log(createdParent)
  student.parentId = createdParent.parentId;
  student.GradeGradeId = student.gradeId;
  await Student.create(student);
  res.json(student);
});

router.put("/", async (req, res) => {
  const student = req.body;
  let createdParent ;
  if(student.parent.parentId == ''){
     createdParent = await Parent.create(student.parent);
  }else{
     createdParent = await Parent.update({ ...student.parent }, {
      where: {
        parentId: student.parent.parentId
      }
    });;
  }
  
  console.log("sajit")
  console.log(createdParent)
  console.log(student)
  student.parentId = createdParent.parentId;
  student.GradeGradeId = student.gradeId;
  const createdStudent = await Student.update({ ...student }, {
    where: {
      studentId: student.studentId
    }
  });;
  res.json(createdStudent);
});

router.get("/studentList", async (req, res) => {
  const listOfStudents = await Student.findAll({
    attributes: [
      "studentId",
      "fName",
      "lName",
      "gender",
      "birthday",
      "ClassClassName",
      "regyear",
      "pNote",
    ],
  });

  // Extract the required properties for each student and assign a unique id
  const formattedList = listOfStudents.map((student, index) => ({
    id: index + 1, // Assign a unique id based on the index (starting from 1)
    studentId: student.studentId,
    fName: student.fName,
    lName: student.lName,
    gender: student.gender,
    birthday: student.birthday,
    ClassClassName: student.ClassClassName,
    regyear: student.regyear,
    pNote: student.pNote,
  }));

  res.json(formattedList);
});

module.exports = router;
