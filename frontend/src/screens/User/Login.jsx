import React from 'react'
import LoginCard from '../../components/User/LoginCard';
import { Box } from '@mui/material';

function Login() {
  return (
    <Box sx={{background: "linear-gradient(to bottom right, #f0f4f8, #ffffff)"}}>
    <LoginCard />
    </Box>
)
}

export default Login