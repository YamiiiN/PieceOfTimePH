import React from 'react'
import Basic from '../../components/User/CartDisplay'
import { Box } from '@mui/material'
import Footer from '../../components/User/Footer'
import NavBar from '../../components/Home/NavBar'

const Cart = () => {
  return (
    <Box>
      <NavBar />
        <Basic />
        <Footer/>
    </Box>
  )
}

export default Cart