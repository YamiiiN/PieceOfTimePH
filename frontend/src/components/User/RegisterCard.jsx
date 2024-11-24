import React from "react";
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setToken } from '../../state/authSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

const RegisterCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
    images: Yup.mixed().required('Images are required').test(
      'fileSize',
      'File too large',
      value => !value || (value && value.size <= 5000000) // limit size to 5MB
    ),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      repeatPassword: '',
      images: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Handle image file upload
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('images', values.images); // Handle image upload

        await createUserWithEmailAndPassword(auth, values.email, values.password);
        dispatch(setToken(auth.currentUser.accessToken));
        navigate('/home');
      } catch (error) {
        console.error("Registration Error: ", error);
      }
    },
  });

  return (
    <Container
      maxWidth="l"
      sx={{
        height: "100vh",
        minWidth: "1000px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #f0f4f8, #ffffff)",
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "1000px",
          height: "auto",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Grid item xs={6} sx={{ position: "relative", overflow: 'hidden', borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }}>
          <video autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/watchvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: "30px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "12px",
              boxShadow: "none",
            }}
          >
            <Box sx={{ textAlign: "center", marginBottom: "30px", marginTop: "30px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "600",
                  marginBottom: "5px",
                  color: "#333",
                }}
              >
                Sign Up
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins, sans-serif", color: "#555" }}
              >
                Enter your details to create an account.
              </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <TextField
                fullWidth
                label="First Name"
                id="first_name"
                type="text"
                variant="outlined"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
                sx={{
                  marginBottom: "20px",
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
              <TextField
                fullWidth
                label="Last Name"
                id="last_name"
                type="text"
                variant="outlined"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
                sx={{
                  marginBottom: "20px",
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                id="email"
                type="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  marginBottom: "20px",
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                id="password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                  marginBottom: "20px",
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                id="repeatPassword"
                type="password"
                variant="outlined"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                sx={{
                  marginBottom: "20px",
                  '& .MuiInputLabel-root': { color: '#888' },
                }}
              />
              
              {/* Image Upload Field */}
              <input
                accept="image/*"
                id="images"
                name="images"
                type="file"
                onChange={(e) => formik.setFieldValue('images', e.target.files[0])}
                style={{ marginBottom: "20px" }}
              />
              {formik.touched.images && formik.errors.images && (
                <Typography color="error">{formik.errors.images}</Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: "8px",
                  '&:hover': { backgroundColor: "#333" },
                }}
              >
                Sign Up
              </Button>
            </form>

            <Typography
              component="a"
              href="/login"
              sx={{
                marginTop: "15px",
                color: "#555",
                fontSize: "14px",
                textDecoration: "none",
                '&:hover': { textDecoration: "underline" },
              }}
            >
              Already have an account? Sign In
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterCard;
