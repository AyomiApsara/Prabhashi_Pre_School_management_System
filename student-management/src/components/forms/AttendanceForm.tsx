import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { StudentManagementResponse } from "../../models/response";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";
import { Auth } from "../../models/Auth";
import { Attendance } from "../../models/attendance";
import { Student } from "../../models/student";
import { useEffect, useState } from "react";
import { studentService } from "../../service/impl/StudentServiceImpl";
import { useNavigate } from "react-router-dom";





interface AttendanceFormProps {
    attendance: Attendance;
    saveAttendance: (attendance: Attendance, auth: Auth) => Promise<StudentManagementResponse>;
}

const AttendanceForm = ({ attendance, saveAttendance }: AttendanceFormProps) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { auth } = useAuth();

    const validationSchema = yup.object({
        
        date: yup.date()
    .max(new Date(), "date can't be in the future")
    .required('Date is required'),
        studentId: yup.string().required("Student is required"),

    });

    const formikk = useFormik({
        initialValues: {
            ...attendance,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('sssssssssssssss');
            console.log('sssssssssssssss');
            let response: StudentManagementResponse = new StudentManagementResponse();
            response.status = "200";
            const updatedAttendance: Attendance = {
                ...attendance,
                ...values,
            };
            saveAttendance(updatedAttendance, auth).then(
                (response: StudentManagementResponse) => {
                    enqueueSnackbar("SuccessFully saved", { variant: "success" });
                }
            );
        },
    });

    
    const [students, setStudents] = useState(new Array<Student>());
    const [studentsLoaded, setstudentsLoaded] = useState(false);
    useEffect(() => {
        const clasess: JSX.Element[] = [];

        studentService.getAllStudents(0,0,auth).then((students: Array<Student>) => {
            setStudents(students);
            setstudentsLoaded(true)
        }).catch(error => {
            console.log('Error loading users:', error);
            if (error.response.status == 403) {
                navigate("/login")
            }
        });
        ;



    }, [studentsLoaded])
    return (
        <form onSubmit={formikk.handleSubmit}>
             <Box sx={{ width: '100%' }}>
                
                <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                <Stack spacing={2} direction="row">
                    <TextField
                        id="date"
                        name="date"
                        type="date"
                        variant="outlined"
                        color="secondary"
                        label="Date"
                        value={formikk.values.date}
                        onChange={formikk.handleChange}
                        fullWidth
                        error={formikk.touched.date && Boolean(formikk.errors.date)}
                        helperText={formikk.touched.date && formikk.errors.date}
                    /> <Stack spacing={2} direction="row"></Stack>
                     <FormControl
                        fullWidth
                        error={formikk.touched.studentId && Boolean(formikk.errors.studentId)}
                    >
                        <InputLabel id="demo-simple-select-label">Student</InputLabel>                    <Select
                            name="studentId"
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="studentId"
                            value={formikk.values.studentId}
                            label="Teacher"
                            onChange={formikk.handleChange}
                        >
                            {students.map((student) => (
                                <MenuItem value={student.studentId}>{student.fullname + ' - ' + student.studentId}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>

            <div className="flex justify-end pb-8">
                <Button variant="outlined" color="secondary" type="submit">
                    Save
                </Button>
            </div></Box>
            
        </form>
    );
};

export default AttendanceForm;