import React, { useContext, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Step, StepButton, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { Student } from "../../models/student";
import { StudentManagementResponse } from "../../models/response";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";
import { Auth } from "../../models/Auth";
import { gradeService } from "../../service/impl/GradeServiceImpl";
import { Grade } from "../../models/grade";
import { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";



const steps = ['Basic Details', 'Parent Details', 'Other details'];

interface StudentFormProps {
  student: Student;
  saveStudent: (student: Student, auth: Auth) => Promise<StudentManagementResponse>;
}

const StudentForm = ({ student, saveStudent }: StudentFormProps) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useAuth();

  const phoneNumberRegex = /^(?:\+?94|0)?\d{10}$/;

  const validationSchema = yup.object({
    fName: yup.string().required("First name is required"),
    lName: yup.string().required("Last name is required"),
    fullname: yup.string().required("Full name is required"),
    gender: yup.string().required("Gender is required"),

    birthday: yup.date()
    .max(new Date(), "Birthday can't be in the future")
    .required('Birthday is required'),

    address: yup.string().required("Address is required"),
    nation: yup.string().required("Nationality is required"),
    religion: yup.string().required("Religion is required"),
    parent: yup.object({
      fatherName: yup.string().required("Father's Name is required"),
      fatherNIC: yup
      .string()
      .required("father's NIC is required")
      .matches(/^(?:\d{9}[Vv]|[0-9]{12})$/, 'Invalid NIC format'),
     
      fatherNo: yup
      .string()
      .required("Father's Contact No. is required")
      .matches(phoneNumberRegex, 'Invalid phone number')
      .test('exactDigits', 'Phone number should be exactly 10 digits', (value) => {
      if (value && value.length === 10) {
        return true;
      }
      return new yup.ValidationError('Phone number should be exactly 10 digits');
    }),
      motherName: yup.string().required("Mother's Name is required"),
      motherNIC: yup
      .string()
      .required("Mother's NIC is required")
      .matches(/^(?:\d{9}[Vv]|[0-9]{12})$/, 'Invalid NIC format'),
      
      motherNo: yup
    .string()
    .required("Mother's Contact No. is required")
    .matches(phoneNumberRegex, 'Invalid phone number')
    .test('exactDigits', 'Phone number should be exactly 10 digits', (value) => {
      if (value && value.length === 10) {
        return true;
      }
      return new yup.ValidationError('Phone number should be exactly 10 digits');
    }),
    })
  });

  const formik = useFormik({
    initialValues: {
      ...student,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let response: StudentManagementResponse = new StudentManagementResponse();
      response.status = "200";
      const updatedStudent: Student = {
        ...student,
        ...values,
      };
      saveStudent(updatedStudent, auth).then(
        (response: StudentManagementResponse) => {
          enqueueSnackbar("SuccessFully saved", { variant: "success" });
        }
      ).catch(error => {
       
        if(error.response.status == 403){
          navigate("/login")
        }
      });;
    },
  });

  function renderYearOptions() {
    const currentYear = new Date().getFullYear() + 5;
    const years = [];


    // Generate options for the last 10 years (adjust as needed)
    for (let i = currentYear; i >= currentYear - 10; i--) {
      years.push(
        <MenuItem value={i}>{i}</MenuItem>

      );
    }

    return years;
  }

  function renderClassOptions() {
    const clasess: JSX.Element[] = [];

    gradeService.getAllgrades(auth).then((grades: Array<Grade>) => {
      grades.forEach(grade => {
        clasess.push(
          <MenuItem value={grade.gradeId}>{grade.gradeName}</MenuItem>

        );
      })
    }).catch(error => {
      console.log('Error loading users:', error);
      if(error.response.status == 403){
        navigate("/login")
      }
    });
    ;


    return clasess;
  }
  //stepper functions

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  //end of stepper funcs


  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {(
          <React.Fragment>
            {activeStep === 0 ? (<React.Fragment><Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
              <Stack spacing={2} direction="row">
                <TextField
                  id="fName"
                  name="fName"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="First Name"
                  value={formik.values.fName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.fName && Boolean(formik.errors.fName)}
                  helperText={formik.touched.fName && formik.errors.fName}
                />
                <TextField
                  name="lName"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Last Name"
                  value={formik.values.lName}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.lName && Boolean(formik.errors.lName)}
                  helperText={formik.touched.lName && formik.errors.lName}
                />
                <TextField
                  name="fullname"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Full Name"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                  helperText={formik.touched.fullname && formik.errors.fullname}
                />
              </Stack>
              <Stack spacing={2} direction="row">
                <FormControl
                  fullWidth
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    variant="outlined"
                    labelId="demo-simple-select-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    label="Gender"
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"10"}>Male</MenuItem>
                    <MenuItem value={"20"}>FeMale</MenuItem>
                  </Select>
                </FormControl>

                {/* <TextField
            name="gender"
            type="text"
            variant="outlined"
            color="secondary"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            fullWidth
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          /> */}
                <TextField
                  name="birthday"
                  type="date"
                  variant="outlined"
                  color="secondary"
                  label="Birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  fullWidth
                  error={formik.touched.birthday && Boolean(formik.errors.birthday)}
                  helperText={formik.touched.birthday && formik.errors.birthday}
                />
              </Stack>
              <TextField
                name="address"
                type="text"
                variant="outlined"
                color="secondary"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <Stack spacing={2} direction="row">
                <TextField
                  name="nation"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Nationality"
                  value={formik.values.nation}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={formik.touched.nation && Boolean(formik.errors.nation)}
                  helperText={formik.touched.nation && formik.errors.nation}
                />
                <TextField
                  name="religion"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Religion"
                  value={formik.values.religion}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={formik.touched.religion && Boolean(formik.errors.religion)}
                  helperText={formik.touched.religion && formik.errors.religion}
                />
              </Stack>


            </Stack></React.Fragment>) : activeStep === 1 ? (<React.Fragment><Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>


              <Stack spacing={2} direction="row">
                <TextField
                  name="parent.fatherName"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Father's Name"
                  value={formik.values.parent.fatherName}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={
                    formik.touched.parent?.fatherName &&
                    Boolean(formik.errors.parent?.fatherName)
                  }
                  helperText={
                    formik.touched.parent?.fatherName &&
                    formik.errors.parent?.fatherName
                  }
                />
              </Stack>

              <Stack spacing={2} direction="row">
                <TextField
                  name="parent.fatherNIC"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Father's NIC: "
                  value={formik.values.parent.fatherNIC}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={
                    formik.touched.parent?.fatherNIC &&
                    Boolean(formik.errors.parent?.fatherNIC)
                  }
                  helperText={
                    formik.touched.parent?.fatherNIC &&
                    formik.errors.parent?.fatherNIC
                  }
                />
                <TextField
                  name="parent.fatherNo"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Father's Contact No: "
                  value={formik.values.parent.fatherNo}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={
                    formik.touched.parent?.fatherNo &&
                    Boolean(formik.errors.parent?.fatherNo)
                  }
                  helperText={
                    formik.touched.parent?.fatherNo && formik.errors.parent?.fatherNo
                  }
                />
              </Stack>

              <Stack spacing={2} direction="row">
                <TextField
                  name="parent.motherName"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Mother's Name"
                  value={formik.values.parent.motherName}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={
                    formik.touched.parent?.motherName &&
                    Boolean(formik.errors.parent?.motherName)
                  }
                  helperText={
                    formik.touched.parent?.motherName &&
                    formik.errors.parent?.motherName
                  }
                />
              </Stack>

              <Stack spacing={2} direction="row">
                <TextField
                  name="parent.motherNIC"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Mother's NIC: "
                  value={formik.values.parent.motherNIC}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={
                    formik.touched.parent?.motherNIC &&
                    Boolean(formik.errors.parent?.motherNIC)
                  }
                  helperText={
                    formik.touched.parent?.motherNIC &&
                    formik.errors.parent?.motherNIC
                  }
                />
                <TextField
                  name="parent.motherNo"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  label="Mother's Contact No: "
                  value={formik.values.parent.motherNo}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ flex: 1 }}
                  error={
                    formik.touched.parent?.motherNo &&
                    Boolean(formik.errors.parent?.motherNo)
                  }
                  helperText={
                    formik.touched.parent?.motherNo && formik.errors.parent?.motherNo
                  }
                />
              </Stack>
            </Stack></React.Fragment>) : (<React.Fragment><Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
              <Stack spacing={2} direction="row">
                <FormControl
                  fullWidth
                  error={formik.touched.regyear && Boolean(formik.errors.regyear)}
                >
                  <InputLabel id="demo-simple-select-label">Select Year</InputLabel>
                  <Select
                    name="regyear"
                    variant="outlined"
                    labelId="demo-simple-select-label"
                    id="regyear"
                    value={formik.values.regyear}
                    label="Registration Year"
                    onChange={formik.handleChange}
                  >
                    {renderYearOptions()}
                  </Select>
                </FormControl>


                <FormControl
                  fullWidth
                  error={formik.touched.gradeId && Boolean(formik.errors.gradeId)}
                >
                  <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
                  <Select
                    name="gradeId"
                    variant="outlined"
                    labelId="demo-simple-select-label"
                    id="gradeId"
                    value={formik.values.gradeId}
                    label="Registration Year"
                    onChange={formik.handleChange}
                  >
                    {renderClassOptions()}
                  </Select>
                </FormControl>
              </Stack>
            </Stack><div className="flex justify-end pb-8">
                <Button variant="outlined" color="secondary" type="submit">
                  Save
                </Button>
              </div></React.Fragment>)}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ?
                  <div></div> : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>



    </form>
  );
};

export default StudentForm;
