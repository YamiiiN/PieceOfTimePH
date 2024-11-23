import React from 'react'
import NavBar from '../../components/Home/NavBar'
import ProductListing from '../../components/Products/ProductListing'
import Footer from '../../components/User/Footer'
import Spinner from '../../components/Spinner'
import { Box } from '@mui/material'

const ProductList = () => {

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
        <NavBar username="Diana Carreon"/>
        <ProductListing />
        <Footer />
    </Box>
  )
}

export default ProductList