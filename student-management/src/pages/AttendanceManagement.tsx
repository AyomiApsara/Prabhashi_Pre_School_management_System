import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import AttendanceTable from "../components/tables/AttendanceTable";
import LargeModal from "../components/LargeModal";
import AttendanceForm from "../components/forms/AttendanceForm";
import { Attendance } from "../models/attendance";
import { attendanceService } from "../service/impl/AttendanceServiceImpl";
import useAuth from "../hooks/useAuth";

const AttendanceManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  let attendance: Attendance = new Attendance();
 

  return (
    <>
      <Container maxWidth="xl" className="flex w-full mt-4 mb-4">
        <div className="flex justify-end pb-8">
          <Button
            onClick={handleOpen}
            className="bg-blue-600"
            variant="contained"
          >
            Add new Attendance
          </Button>
        </div>
        <LargeModal modalOpan={open} setOpen={setOpen}>
          <Typography
            id="modal-modal-title"
            className="flex pb-8"
            variant="h6"
            component="h2"
          >
            Attendance
          </Typography>
          <AttendanceForm
            attendance={attendance}
            saveAttendance={attendanceService.saveAttendance}
          />
        </LargeModal>
        <AttendanceTable loadAttendances={attendanceService.getAllAttendances} />
      </Container>
    </>
  );
};

export default AttendanceManagement;
