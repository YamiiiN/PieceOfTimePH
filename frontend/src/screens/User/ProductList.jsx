import React from 'react'
import NavBar from '../../components/Home/NavBar'
import ProductListing from '../../components/Products/ProductListing'
import Footer from '../../components/User/Footer'
import { Box } from '@mui/material'

const ProductList = () => {
  return (
    <Box>
        <NavBar username="Diana Carreon"/>
        <ProductListing />
        <Footer />
    </Box>
  )
}

export default ProductList