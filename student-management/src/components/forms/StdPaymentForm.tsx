import React, { useContext, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Step, StepButton, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { StdPayment } from "../../models/stdPayment";
import { StudentManagementResponse } from "../../models/response";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import useAuth from "../../hooks/useAuth";
import { Auth } from "../../models/Auth";
import { studentService } from "../../service/impl/StudentServiceImpl";
import { Student } from "../../models/student";
import { JSX } from "react/jsx-runtime";



const steps = ['Basic Details', 'Parent Details', 'Other details'];

interface StdPaymentFormProps {
  stdPayment: StdPayment;
  saveStdPayment: (stdPayment: StdPayment, auth: Auth) => Promise<StudentManagementResponse>;
}

const StdPaymentForm = ({ stdPayment, saveStdPayment }: StdPaymentFormProps) => {

  const { enqueueSnackbar } = useSnackbar();
  const { auth } = useAuth();

  const validationSchema = yup.object({
    
    month: yup.string().required("Month is required"),
    year: yup.string().required("Year is required"),
    note: yup.string().required("note is required"),
    
  
  });

  const formik = useFormik({
    initialValues: {
      ...stdPayment,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let response: StudentManagementResponse = new StudentManagementResponse();
      response.status = "200";
      const updatedStdPayment: StdPayment = {
        ...stdPayment,
        ...values,
      };
      saveStdPayment(updatedStdPayment, auth).then(
        (response: StudentManagementResponse) => {
          enqueueSnackbar("SuccessFully saved", { variant: "success" });
        }
      );
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
            {(<React.Fragment><Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
            <Stack spacing={2} direction="row">
                    <TextField
                        id="day"
                        name="day"
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Day"
                        value={formik.values.day}
                        onChange={formik.handleChange}
                        fullWidth
                        error={formik.touched.day && Boolean(formik.errors.day)}
                        helperText={formik.touched.day && formik.errors.day}
                    />
                    <TextField
                        name="month"
                        type="month"
                        variant="outlined"
                        color="secondary"
                        label="Month"
                        value={formik.values.month}
                        onChange={formik.handleChange}
                        fullWidth
                        error={formik.touched.month && Boolean(formik.errors.month)}
                        helperText={formik.touched.month && formik.errors.month}
                    />
                    <TextField
                        name="year"
                        type="year"
                        variant="outlined"
                        color="secondary"
                        label="Year"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        fullWidth
                        error={formik.touched.year && Boolean(formik.errors.year)}
                        helperText={formik.touched.year && formik.errors.year}
                    />
                    <TextField
                        name="note"
                        type="note"
                        variant="outlined"
                        color="secondary"
                        label="Note"
                        value={formik.values.note}
                        onChange={formik.handleChange}
                        fullWidth
                        error={formik.touched.note && Boolean(formik.errors.note)}
                        helperText={formik.touched.note && formik.errors.note}
                    />
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

export default StdPaymentForm;
