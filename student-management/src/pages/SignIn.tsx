import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { StudentManagementResponse } from '../models/response';
import * as yup from "yup";
import { User } from '../models/user';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { authService } from '../service/impl/AuthServiceImpl';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
  const [user, setUser] = useState(new User());
  const { setAuth } = useAuth();


  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";



  const validationSchema = yup.object({
    username: yup.string().required("User name is required"),
    password: yup.string().required("Password is required"),
    
  });

  const formik = useFormik({
    initialValues: {
      ...user,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let response: StudentManagementResponse = new StudentManagementResponse();
      
      setUser({...values});
     
      authService.login({...values}).then(
        (response: StudentManagementResponse) => {
          const resUser:User = response.data.user as User;
          const accessToken:string = response.data.accessToken;
                       setAuth({ user:resUser.username, password:resUser.password, roles:[resUser.role], accessToken:accessToken });
                      setUser(user);
                      //setPwd(user.password);
                      navigate(from, { replace: true });
          //enqueueSnackbar("SuccessFull", { variant: "success" });
        }
      );
    },
  });


    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //   event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //       username: data.get('username'),
    //       password: data.get('password'),
    //     });
    //     try {
    //         // authService.login(user)
    //         // console.log(JSON.stringify(response?.data));
    //         // //console.log(JSON.stringify(response));
    //         // const accessToken = response?.data?.accessToken;
    //         // const roles = response?.data?.roles;
            // setAuth({ user, pwd, roles, accessToken });
            // setUser('');
            // setPwd('');
            // navigate(from, { replace: true });
    //     } catch (err) {
    //         // if (!err?.response) {
    //         //     setErrMsg('No Server Response');
    //         // } else if (err.response?.status === 400) {
    //         //     setErrMsg('Missing Username or Password');
    //         // } else if (err.response?.status === 401) {
    //         //     setErrMsg('Unauthorized');
    //         // } else {
    //         //     setErrMsg('Login Failed');
    //         // }
    //         // errRef.current.focus();
    //     }
    // }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit}>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              value={formik.values.username}
                  onChange={formik.handleChange}
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
              margin="normal"
              value={formik.values.password}
                  onChange={formik.handleChange}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
         </form>
        </Box>
  
      </Container>
    </ThemeProvider>
  );
}
