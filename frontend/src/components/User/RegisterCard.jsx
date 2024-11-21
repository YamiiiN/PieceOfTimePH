import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';

import { baseUrl } from '../../assets/constants';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';



function Copyright() {
  return (
    <Typography variant="body2" align="center" color="#a7c7e7">
      {'Copyright © '}
      <Link color="#9575cd" href="https://mui.com/">
        IntegrityHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {

  // para mas navigate sa login to bali variable siya
  const navigate = useNavigate();

  // YUP VALIDATION
  const validationSchema = Yup.object({

    first_name: Yup.string()
      .max(20, 'First Name must be less than 20 characters')
      .required('First Name is required'),

    last_name: Yup.string()
      .max(20, 'Last Name must be less than 20 characters')
      .required('Last Name is required'),

    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
      .required('Password is required'),

    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensures repeatPassword matches the password
      .required('Please confirm your password'),

    images: Yup.string()
      .required('Images are required'),
  });

  // FORMIK
  const formik = useFormik({
    validationSchema: validationSchema,

    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      repeatPassword: '',
      images: '',
    },

    onSubmit: (values) => {
      console.log(values)

      register(values);

      fireBaseAuth(values);

    }
  })

  const register = async (values) => {

    try {

      const formData = new FormData;
      for (let i = 0; i <= formik.values.images.length; i++) {
        formData.append('images', formik.values.images[i]);
      }
      formData.append('first_name', formik.values.first_name)
      formData.append('last_name', formik.values.last_name)
      formData.append('email', formik.values.email)
      formData.append('password', formik.values.password)

      const { data } = await axios.post(`${baseUrl}/user/register`, formData)

      console.log(data);

      navigate('/login')

    } catch (error) {
      alert("Error occured!");
      console.error(error);
    }
  }


  const fireBaseAuth = async (values) => {


    await createUserWithEmailAndPassword(auth, values.email, values.password);

    const user = auth.currentUser;

    console.log(user);

  }

  // const [formData, setFormData] = useState({
  //   fname: '',
  //   lname: '',
  //   username: '',
  //   email: '',
  //   password: '',
  // });

  return (
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "#9575cd" }}>
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="first_name"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                id="first_name"
                label="First Name"
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.first_name}
              />
              {/* CONDITIONAL RENDERING */}
              {formik.touched.first_name && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.first_name}</small>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                autoComplete="last_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.last_name}
              />
              {/* CONDITIONAL RENDERING */}
              {formik.touched.last_name && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.last_name}</small>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {/* CONDITIONAL RENDERING */}
              {formik.touched.email && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.email}</small>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {/* CONDITIONAL RENDERING */}
              {formik.touched.password && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.password}</small>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="repeatPassword"
                id="repeatPassword"
                autoComplete="repeatPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repeatPassword}
              />
              {/* CONDITIONAL RENDERING */}
              {formik.touched.repeatPassword && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.repeatPassword}</small>
              )}
            </Grid>


            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => formik.setFieldValue('images', e.target.files)}
            />
            {formik.touched.images && (
              <small style={{ fontSize: 12, color: "red" }}>{formik.errors.images}</small>
            )}
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive information and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: 'linear-gradient(135deg, #a7c7e7, #d0a0d2)', fontWeight: 'bold' }}
            onClick={formik.handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" color="#d0a0d2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
