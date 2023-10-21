import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import TeacherTable from "../components/tables/TeacherTable";
import LargeModal from "../components/LargeModal";
import TeacherForm from "../components/forms/TeacherForm";
import { Teacher } from "../models/teacher";
import { teacherService } from "../service/impl/TeacherServiceImpl"; 
import useAuth from "../hooks/useAuth";

const TeacherView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  let teacher: Teacher = new Teacher();
 

  return (
    <>
      <Container maxWidth="xl" className="flex w-full mt-4 mb-4">
        
        <TeacherTable loadTeachers={teacherService.getAllTeachers} setOpenTeacherModal={function (teacher: Teacher): void {
          throw new Error("Function not implemented.");
        } } />
      </Container>
    </>
  );
};

export default TeacherView;
