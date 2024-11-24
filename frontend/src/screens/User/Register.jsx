import React from 'react'
import SignUp from '../../components/User/RegisterCard';
import { Box } from '@mui/material';

function Register() {
  return (
    <Box sx={{background: "linear-gradient(to bottom right, #f0f4f8, #ffffff)"}}>
      <SignUp />
    </Box>
  )
}

export default Register;