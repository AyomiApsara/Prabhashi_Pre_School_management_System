import React from "react";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import AttendanceTable from "../components/tables/AttendanceTable";
import LargeModal from "../components/LargeModal";
import AttendanceForm from "../components/forms/AttendanceForm";
import { Attendance } from "../models/attendance";
import { attendanceService } from "../service/impl/AttendanceServiceImpl";
import useAuth from "../hooks/useAuth";

const AttendanceView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  let attendance: Attendance = new Attendance();
 

  return (
    <>
      <Container maxWidth="xl" className="flex w-full mt-4 mb-4">
        
        <AttendanceTable loadAttendances={attendanceService.getAllAttendances} />
      </Container>
    </>
  );
};

export default AttendanceView;
