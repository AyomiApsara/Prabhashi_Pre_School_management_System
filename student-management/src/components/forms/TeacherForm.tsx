import { Button, Stack, TextField } from "@mui/material";
import { Teacher } from "../../models/teacher";
import { StudentManagementResponse } from "../../models/response";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";
import { Auth } from "../../models/Auth";
import { useNavigate } from "react-router-dom";

interface TeacherFormProps {
    teacher: Teacher;
    saveTeacher: (teacher: Teacher, auth: Auth) => Promise<StudentManagementResponse>;
}

const TeacherForm = ({ teacher, saveTeacher }: TeacherFormProps) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { auth } = useAuth();

    const phoneNumberRegex = /^(?:\+?94|0)?\d{10}$/;

    const validationSchema = yup.object({

        fName: yup.string().required("First name is required"),
        lName: yup.string().required("Last name is required"),
        fullname: yup.string().required("Full name is required"),
        address: yup.string().required("Address is required"),
        teacherNIC: yup
            .string()
            .required("Mother's NIC is required")
            .matches(/^(?:\d{9}[Vv]|[0-9]{12})$/, 'Invalid NIC format'),

        teacherNo: yup
            .string()
            .required("Father's Contact No. is required")
            .matches(phoneNumberRegex, 'Invalid phone number')
            .test('exactDigits', 'Phone number should be exactly 10 digits', (value) => {
                if (value && value.length === 10) {
                    return true;
                }
                return new yup.ValidationError('Phone number should be exactly 10 digits');
            }),

        teacherEmail: yup.string().required("Email is required"),
        regDate: yup.date()
            .max(new Date(), "regDate can't be in the future")
            .required('regDate is required'),

    });

    const formikk = useFormik({
        initialValues: {
            ...teacher,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('sssssssssssssss');
            console.log('sssssssssssssss');
            let response: StudentManagementResponse = new StudentManagementResponse();
            response.status = "200";
            const updatedTeacher: Teacher = {
                ...teacher,
                ...values,
            };
            saveTeacher(updatedTeacher, auth).then(
                (response: StudentManagementResponse) => {
                    enqueueSnackbar("SuccessFully saved", { variant: "success" });
                }
            ).catch(error => {

                if (error.response.status == 403) {
                    navigate("/login")
                }
            });
        },
    });



    return (




        <form onSubmit={formikk.handleSubmit}>
            <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
                <Stack spacing={2} direction="row">
                    <TextField
                        id="fName"
                        name="fName"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="First Name"
                        value={formikk.values.fName}
                        onChange={formikk.handleChange}
                        fullWidth
                        error={formikk.touched.fName && Boolean(formikk.errors.fName)}
                        helperText={formikk.touched.fName && formikk.errors.fName}
                    />
                    <TextField
                        name="lName"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Last Name"
                        value={formikk.values.lName}
                        onChange={formikk.handleChange}
                        fullWidth
                        error={formikk.touched.lName && Boolean(formikk.errors.lName)}
                        helperText={formikk.touched.lName && formikk.errors.lName}
                    />
                    <TextField
                        name="fullname"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Full Name"
                        value={formikk.values.fullname}
                        onChange={formikk.handleChange}
                        fullWidth
                        error={formikk.touched.fullname && Boolean(formikk.errors.fullname)}
                        helperText={formikk.touched.fullname && formikk.errors.fullname}
                    />
                </Stack>
                <Stack spacing={2} direction="row">
                    <TextField
                        name="address"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Address"
                        value={formikk.values.address}
                        onChange={formikk.handleChange}
                        fullWidth
                        error={formikk.touched.address && Boolean(formikk.errors.address)}
                        helperText={formikk.touched.address && formikk.errors.address}
                    />
                </Stack>

                <Stack spacing={2} direction="row">

                    <TextField
                        name="teacherNIC"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Teacher NIC"
                        value={formikk.values.teacherNIC}
                        onChange={formikk.handleChange}
                        fullWidth
                        sx={{ flex: 1 }}
                        error={formikk.touched.teacherNIC && Boolean(formikk.errors.teacherNIC)}
                        helperText={formikk.touched.teacherNIC && formikk.errors.teacherNIC}
                    />
                    <TextField
                        name="teacherNo"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Teacher No"
                        value={formikk.values.teacherNo}
                        onChange={formikk.handleChange}
                        fullWidth
                        sx={{ flex: 1 }}
                        error={formikk.touched.teacherNo && Boolean(formikk.errors.teacherNo)}
                        helperText={formikk.touched.teacherNo && formikk.errors.teacherNo}
                    />



                    <TextField
                        name="teacherEmail"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Teacher Email"
                        value={formikk.values.teacherEmail}
                        onChange={formikk.handleChange}
                        fullWidth
                        sx={{ flex: 1 }}
                        error={formikk.touched.teacherEmail && Boolean(formikk.errors.teacherEmail)}
                        helperText={formikk.touched.teacherEmail && formikk.errors.teacherEmail}
                    />
                    <TextField
                        name="regDate"
                        type="date"
                        variant="outlined"
                        color="secondary"
                        label="Teacher Reg. Date"
                        value={formikk.values.regDate}
                        onChange={formikk.handleChange}
                        fullWidth
                        sx={{ flex: 1 }}
                        error={formikk.touched.regDate && Boolean(formikk.errors.regDate)}
                        helperText={formikk.touched.regDate && formikk.errors.regDate}
                    />
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

export default TeacherForm;