import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import TeacherTable from "../components/tables/TeacherTable";
import LargeModal from "../components/LargeModal";
import TeacherForm from "../components/forms/TeacherForm";
import { Teacher } from "../models/teacher";
import { teacherService } from "../service/impl/TeacherServiceImpl";
import useAuth from "../hooks/useAuth";

const TeacherManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [teacher, setTeacher] = React.useState(new Teacher());
 
  const [openUpdatdModal, setUpdatdModal] = React.useState(false);
  const [teacherUpdatdModal, setTeacherUpdatdModal] = React.useState(new Teacher());

  function teacherEditClick(teacher: Teacher):void {
    setTeacherUpdatdModal(teacher);
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
            Add new Teacher
          </Button>
        </div>
        <LargeModal modalOpan={open} setOpen={setOpen}>
          <Typography
            id="modal-modal-title"
            className="flex pb-8"
            variant="h6"
            component="h2"
          >
            Add New Teacher
          </Typography>
          <TeacherForm
            teacher={teacher}
            saveTeacher={teacherService.saveTeacher}
          />
        </LargeModal>

        {/* //update modal */}
        <LargeModal modalOpan={openUpdatdModal} setOpen={setUpdatdModal}>
          <Typography
            id="modal-modal-title"
            className="flex pb-8"
            variant="h6"
            component="h2"
          >
           Edit Teacher
          </Typography>
          <TeacherForm
            teacher={teacherUpdatdModal}
            saveTeacher={teacherService.updateTeacher}
          />
        </LargeModal>
        <TeacherTable loadTeachers={teacherService.getAllTeachers} setOpenTeacherModal={ teacherEditClick} />
      </Container>
    </>
  );
};

export default TeacherManagement;
