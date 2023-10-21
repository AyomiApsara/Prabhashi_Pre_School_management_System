import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import StudentTable from "../components/tables/StudentTable";
import LargeModal from "../components/LargeModal";
import StudentForm from "../components/forms/StudentForm ";
import { Student } from "../models/student";
import { studentService } from "../service/impl/StudentServiceImpl";
import useAuth from "../hooks/useAuth";
import { Auth } from "../models/Auth";

const StudentManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  let student: Student = new Student();
 
  const [openUpdatdModal, setUpdatdModal] = React.useState(false);
  const [teacherUpdatdModal, setStudentUpdatdModal] = React.useState(new Student());


  function studentEditClick(student: Student):void {
    setStudentUpdatdModal(student);
    setUpdatdModal(true);
  }
  return (
    <>
      <Container maxWidth="xl" className="flex w-full mt-4 mb-4">
        <div className="flex justify-end pb-8">
          <Button
            onClick={handleOpen}
            className="bg-blue-600"
            variant="contained"
          >
            Add new Student
          </Button>
        </div>
        <LargeModal modalOpan={open} setOpen={setOpen}>
          <Typography
            id="modal-modal-title"
            className="flex pb-8"
            variant="h6"
            component="h2"
          >
           Edit Student
          </Typography>
          <StudentForm
            student={student}
            saveStudent={studentService.updateStudent}
          />
        </LargeModal>
        <StudentTable loadStudents={studentService.getAllStudents} setOpenStudentModal={studentEditClick} 
        deleteStudent={studentService.deleteStudent
        } />
      </Container>
    </>
  );
};

export default StudentManagement;
