const { Student, Sequelize } = require("../models");

const getAllStudents = async (req, res) => {
    const listOfStudents = await Student.findAll();
    res.json(listOfStudents);
}

const createNewStudent = async (req, res) => {
    const student = req.body;
    
    if (!student.firstname || !student.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }

  
    delete student.studentId; // Remove the studentId attribute
    await Student.create(student);
    res.json(student);
    res.status(201).json(data.employees);
}

const updateStudent = (req, res) => {
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    // if (!employee) {
    //     return res.status(400).json({ "message": `Student ID ${req.body.id} not found` });
    // }
    // if (req.body.firstname) employee.firstname = req.body.firstname;
    // if (req.body.lastname) employee.lastname = req.body.lastname;
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // const unsortedArray = [...filteredArray, employee];
    // data.setStudents(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    // res.json(data.employees);
}

const deleteStudent = (req, res) => {
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    // if (!employee) {
    //     return res.status(400).json({ "message": `Student ID ${req.body.id} not found` });
    // }
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // data.setStudents([...filteredArray]);
    // res.json(data.employees);
}

const getStudent = (req, res) => {
    // const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    // if (!employee) {
    //     return res.status(400).json({ "message": `Student ID ${req.params.id} not found` });
    // }
    // res.json(employee);
}

module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudent,
    deleteStudent,
    getStudent
}