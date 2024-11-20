import React from "react";
import { Container, Grid, Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const LoginCard = () => {
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
        {/* Left Side: Video Background */}
        <Grid item xs={6} sx={{ position: "relative", overflow: 'hidden', borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }}>
          <video autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/watchvid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Grid>

        {/* Right Side: Login Form with Logo */}
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
                  style={{ maxWidth: '300px', height: 'auto', marginBottom: '50px', marginTop: '40px'}} 
                />
              </Box>

              <Typography variant="h5" color="text.primary" sx={{ fontFamily: 'Paytone One, sans-serif', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#DEB82D' }}>
                Sign Up/ Sign In
              </Typography>
              
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                sx={{
                  marginBottom: "15px",
                  input: { fontFamily: 'Poppins, sans-serif', padding: '10px' },
                  label: { fontFamily: 'Poppins, sans-serif' },
                  borderRadius: '8px'
                }}
                InputLabelProps={{ style: { color: '#000' } }}
                InputProps={{ style: { color: '#333' } }}
              />
              
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                sx={{
                  marginBottom: "15px",
                  input: { fontFamily: 'Poppins, sans-serif', padding: '10px' },
                  label: { fontFamily: 'Poppins, sans-serif' },
                  borderRadius: '8px'
                }}
                InputLabelProps={{ style: { color: '#000' } }}
                InputProps={{ style: { color: '#333' } }}
              />
              
              {/* Forgot Password Link */}
              <Typography
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
                Forgot Password?
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
                }}
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
