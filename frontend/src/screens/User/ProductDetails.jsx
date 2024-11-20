import { Box } from '@mui/material';
import React from 'react';
import ProductDetailsPage from '../../components/Products/Details';
import NavBar from '../../components/Home/NavBar';
import Footer from '../../components/User/Footer';

const product = {
  title: 'Paramore Band T-shirt',
  description:
    'A cool Paramore T-shirt made from 100% cotton. Comfortable and stylish for any fan of the band.',
  brand: 'Rolex',
  movement: 'Quartz',
  price: 29.99,
  images: [
    'https://pngimg.com/d/watches_PNG9863.png',
    'https://pngimg.com/d/watches_PNG9863.png',
    'https://pngimg.com/d/watches_PNG9863.png',
  ],
};

const ProductDetails = () => {
  return (
    <Box>
      <NavBar username="Diana Carreon" />
      <ProductDetailsPage product={product} />
      <Footer />
    </Box>
  );
};

export default ProductDetails;
