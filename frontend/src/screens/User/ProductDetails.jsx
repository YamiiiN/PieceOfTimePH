import React from 'react';
import { Box, keyframes } from '@mui/material';
import ProductDetailsPage from '../../components/Products/Details';
import NavBar from '../../components/Home/NavBar';
import Footer from '../../components/User/Footer';
import Spinner from '../../components/Spinner';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        animation: `${fadeIn} 1s ease-in-out`,
      }}
    >
      <NavBar username="Diana Carreon" />
      <ProductDetailsPage product={product} />
      <Footer />
    </Box>
  );
};

export default ProductDetails;