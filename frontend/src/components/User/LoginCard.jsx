import React from "react";
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setToken } from '../../state/authSlice';
import GoogleIcon from '@mui/icons-material/Google';

const LoginCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, values.email, values.password);
        dispatch(setToken(user.accessToken));
        navigate('/home');
      } catch (error) {
        console.error("Login Error: ", error);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      dispatch(setToken(user.accessToken));
      navigate('/home');
    } catch (error) {
      console.error("Google Login Error: ", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #f0f4f8, #ffffff)",
      }}
    >
      <Grid
        container
        sx={{
          maxWidth: "800px",
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
                Sign In
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins, sans-serif", color: "#555" }}
              >
                Enter your credentials to access your account.
              </Typography>
            </Box>

            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
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

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#4285F4",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  '&:hover': { backgroundColor: "#357AE8" },
                }}
                startIcon={<GoogleIcon />}
                onClick={handleGoogleLogin}
              >
                Sign in with Google
              </Button>
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
                Sign In
              </Button>
            </form>

            <Typography
              component="a"
              href="/register"
              sx={{
                marginTop: "15px",
                color: "#555",
                fontSize: "14px",
                textDecoration: "none",
                '&:hover': { textDecoration: "underline" },
              }}
            >
              Don’t have an account? Sign Up
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginCard;
