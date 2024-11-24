import React from "react";
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth, googleProvider, signInWithPopup } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseUrl } from "../../assets/constants";


import { useDispatch } from "react-redux";
import { setToken } from '../../state/authSlice';

const LoginCard = () => {
  const navigate = useNavigate();

  // WAY PARA 
  const dispatch = useDispatch()

  // YUP VALIDATION
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    password: Yup.string()
      .required('Password is required'),
  });

  // FORMIK
  const formik = useFormik({
    validationSchema: validationSchema,

    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: (values) => {
      console.log(values)

      login(values);

    }
  })

  // const login = async (values) => {

  //   try {
  //     const data = await signInWithEmailAndPassword(auth, values.email, values.password)

  //     // const user = auth.currentUser;

  //     navigate('/home');

  //     // console.log(user);
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }

  const login = async (values) => {

    try {
      const data = await signInWithEmailAndPassword(auth, values.email, values.password)

      // const user = auth.currentUser;

      dispatch(
        setToken(data.user.accessToken)
      )

      navigate('/home');

      // console.log(user);
    } catch (error) {
      console.log(error)
    }

  }

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Access the user details
      console.log("Logged in with Google:", user);

      // Dispatch the token to your Redux store (or handle it however you'd like)
      dispatch(setToken(user.accessToken));

      // Navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error("Google Login Error: ", error);
    }
  };


  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, rgba(240,240,240,0.9), rgba(220,220,220,0.9))",
      }}
    >
      <Grid container spacing={0} sx={{ height: "80%", width: "80%", borderRadius: "12px", overflow: 'hidden' }}>
        <Grid item xs={6} sx={{ position: "relative", overflow: 'hidden', borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }}>
          <video autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/watchvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Grid>

        <Grid item xs={6}>
          <Card sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f2f2f2",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadiusRight: "12px",
            transition: 'transform 0.3s ease'
          }}>
            <CardContent sx={{ width: "80%", maxWidth: "420px", padding: "20px", height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <img
                  src="/logo2.png"
                  alt="Logo"
                  style={{ maxWidth: '300px', height: 'auto', marginBottom: '50px', marginTop: '40px' }}
                />
              </Box>

              <Typography variant="h5" color="text.primary" sx={{ fontFamily: 'Paytone One, sans-serif', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#DEB82D' }}>
                Sign Up/ Sign In
              </Typography>

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                id='email'
                type='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                sx={{
                  marginBottom: "15px",
                  input: { fontFamily: 'Poppins, sans-serif', padding: '10px' },
                  label: { fontFamily: 'Poppins, sans-serif' },
                  borderRadius: '8px'
                }}
                InputLabelProps={{ style: { color: '#000' } }}
                InputProps={{ style: { color: '#333' } }}
              />
              {/* CONDITIONAL RENDERING */}
              {formik.touched.email && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.email}</small>
              )}

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                id='password'
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                sx={{
                  marginBottom: "15px",
                  input: { fontFamily: 'Poppins, sans-serif', padding: '10px' },
                  label: { fontFamily: 'Poppins, sans-serif' },
                  borderRadius: '8px'
                }}
                InputLabelProps={{ style: { color: '#000' } }}
                InputProps={{ style: { color: '#333' } }}
              />
              {/* CONDITIONAL RENDERING */}
              {formik.touched.password && (
                <small style={{ fontSize: 12, color: "red" }}>{formik.errors.password}</small>
              )}

              <Typography
                href="/register"
                component="a"
                variant="body2"
                sx={{
                  textAlign: "right",
                  color: "#434343",
                  marginBottom: "15px",
                  fontFamily: 'Poppins, sans-serif',
                  cursor: "pointer",
                  '&:hover': { textDecoration: "underline" },
                }}
              >
                Do not have an account?
              </Typography>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "black",
                  fontFamily: 'Poppins, sans-serif',
                  padding: "10px",
                  borderRadius: "8px",
                  '&:hover': { backgroundColor: "#34A853" },
                  transition: "0.3s",
                  marginBottom: '10px',
                  marginTop: '10px'
                }}
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "white",
                  fontFamily: 'Poppins, sans-serif',
                  padding: "10px",
                  borderRadius: "8px",
                  '&:hover': { backgroundColor: "#434343" },
                  transition: "0.3s",
                }}
                onClick={formik.handleSubmit}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginCard;
