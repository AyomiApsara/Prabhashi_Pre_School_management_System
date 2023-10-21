import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import GradeTable from "../components/tables/GradeTable";
import LargeModal from "../components/LargeModal";
import GradeForm from "../components/forms/GradeForm";
import { Grade } from "../models/grade";
import { gradeService } from "../service/impl/GradeServiceImpl";
import useAuth from "../hooks/useAuth";

const GradeManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  let grade: Grade = new Grade();
 

  return (
    <>
      <Container maxWidth="xl" className="flex w-full mt-4 mb-4">
        <div className="flex justify-end pb-8">
          <Button
            onClick={handleOpen}
            className="bg-blue-600"
            variant="contained"
          >
            Add new Grade
          </Button>
        </div>
        <LargeModal modalOpan={open} setOpen={setOpen}>
          <Typography
            id="modal-modal-title"
            className="flex pb-8"
            variant="h6"
            component="h2"
          >
            Grade
          </Typography>
          <GradeForm
            grade={grade}
            saveGrade={gradeService.saveGrade}
          />
        </LargeModal>
        <GradeTable loadGrades={gradeService.getAllgrades} />
      </Container>
    </>
  );
};

export default GradeManagement;
