import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { StudentManagementResponse } from "../../models/response";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";
import { Auth } from "../../models/Auth";
import { Grade } from "../../models/grade";
import { useNavigate } from "react-router-dom";
import { teacherService } from "../../service/impl/TeacherServiceImpl";
import { Teacher } from "../../models/teacher";
import { useEffect, useState } from "react";


interface GradeFormProps {
    grade: Grade;
    saveGrade: (grade: Grade, auth: Auth) => Promise<StudentManagementResponse>;
}

const GradeForm = ({ grade, saveGrade }: GradeFormProps) => {

    const { enqueueSnackbar } = useSnackbar();
    const { auth } = useAuth();
    const navigate = useNavigate();



    const validationSchema = yup.object({

        gradeName: yup.string().required("Grade name is required"),

        teacherId: yup.string().required("Teacher is required"),
    });
    const [teachers, setTeachers] = useState(new Array<Teacher>());
    const [teachersLoaded, setTeachersLoaded] = useState(false);
    useEffect(() => {
        const clasess: JSX.Element[] = [];

        teacherService.getAllTeachers(auth).then((teachers: Array<Teacher>) => {
            setTeachers(teachers);
            setTeachersLoaded(true)
        }).catch(error => {
            console.log('Error loading users:', error);
            if (error.response.status == 403) {
                navigate("/login")
            }
        });
        ;



    }, [teachersLoaded])


    const formikk = useFormik({
        initialValues: {
            ...grade,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('sssssssssssssss');
            console.log('sssssssssssssss');
            let response: StudentManagementResponse = new StudentManagementResponse();
            response.status = "200";
            const updatedGrade: Grade = {
                ...grade,
                ...values,
            };
            saveGrade(updatedGrade, auth).then(
                (response: StudentManagementResponse) => {
                    enqueueSnackbar("SuccessFully saved", { variant: "success" });
                }
            ).catch(error => {

                if (error.response.status == 403) {
                    navigate("/login")
                }
            });;
        },
    });



    return (
        <form onSubmit={formikk.handleSubmit}>
            <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                <Stack spacing={2} direction="row">
                    <TextField
                        id="gradeName"
                        name="gradeName"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Grade Name"
                        value={formikk.values.gradeName}
                        onChange={formikk.handleChange}
                        fullWidth
                        error={formikk.touched.gradeName && Boolean(formikk.errors.gradeName)}
                        helperText={formikk.touched.gradeName && formikk.errors.gradeName}
                    />
                    <FormControl
                        fullWidth
                        error={formikk.touched.teacherId && Boolean(formikk.errors.teacherId)}
                        
                    >
                        <InputLabel id="demo-simple-select-label">Teacher</InputLabel>                    <Select
                           
                           name="teacherId"
                            variant="outlined"
                            labelId="demo-simple-select-label"
                            id="teacherId"
                            value={formikk.values.teacherId}
                            label="Teacher"
                            onChange={formikk.handleChange}
                        >
                            {teachers.map((teacher) => (
                                <MenuItem value={teacher.teacherId}>{teacher.fullname}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>

            <div className="flex justify-end pb-8">
                <Button variant="outlined" color="secondary" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
};

export default GradeForm;