import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import GradeTable from "../components/tables/GradeTable";
import LargeModal from "../components/LargeModal";
import GradeForm from "../components/forms/GradeForm";
import { Grade } from "../models/grade";
import { gradeService } from "../service/impl/GradeServiceImpl";
import useAuth from "../hooks/useAuth";

const GradeView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  let grade: Grade = new Grade();
 

  return (
    <>
      <Container maxWidth="xl" className="flex w-full mt-4 mb-4">
        
        <GradeTable loadGrades={gradeService.getAllgrades} />
      </Container>
    </>
  );
};

export default GradeView;
