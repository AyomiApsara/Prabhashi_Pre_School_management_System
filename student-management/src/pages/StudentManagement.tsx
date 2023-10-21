import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import StudentTable from "../components/tables/StudentTable";
import LargeModal from "../components/LargeModal";
import StudentForm from "../components/forms/StudentForm ";
import { Student } from "../models/student";
import { studentService } from "../service/impl/StudentServiceImpl";
import useAuth from "../hooks/useAuth";

const StudentManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { auth } = useAuth();
  let student: Student = new Student();
 
  const [openUpdatdModal, setUpdatdModal] = React.useState(false);
  const [studentUpdatdModal, setStudentUpdatdModal] = React.useState(new Student());


  function studentEditClick(student: Student):void {
    studentService.findStudentById(student.studentId,auth).then((st)=>{
      setStudentUpdatdModal(st);
      setUpdatdModal(true);
    })
    
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
           Add New Student
          </Typography>
          <StudentForm
            student={student}
            saveStudent={studentService.saveStudent}
          />
        </LargeModal>


        <LargeModal modalOpan={openUpdatdModal} setOpen={setUpdatdModal}>
          <Typography
            id="modal-modal-title"
            className="flex pb-8"
            variant="h6"
            component="h2"
          >
            Edit Student
          </Typography>
          <StudentForm
            student={studentUpdatdModal}
            saveStudent={studentService.updateStudent}
          />
        </LargeModal>
        <StudentTable deleteStudent={studentService.deleteStudent
        } loadStudents={studentService.getAllStudents} setOpenStudentModal={studentEditClick} />
      </Container>
    </>
  );
};

export default StudentManagement;
