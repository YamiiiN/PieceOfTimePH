import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button, Paper } from '@mui/material';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../assets/constants';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../state/cartSlice';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const { access_token } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart)

  const addProductToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity: 1
        })
      );
    }
  };



  console.log(cartItems);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/product/${id}`, {
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      });
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);


  const settings = product
    ? {
      customPaging: (index) => (
        <img
          src={product.images[index]?.url}
          alt={`thumbnail ${index}`}
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '5px',
            cursor: 'pointer',
            border: '2px solid #ccc',
            margin: '20px',
            transition: 'transform 0.3s, border-color 0.3s',
          }}
        />
      ),
      dots: true,
      dotsClass: 'slick-dots custom-dots',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      appendDots: (dots) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          {dots}
        </div>
      ),
    }
    : {};

  return (
    <Container>
      {product ? (
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Carousel Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Carousel {...settings}>
                {product.images.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.url}
                      alt={`product ${index}`}
                      style={{
                        width: '80%',
                        height: 'auto',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </Paper>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={6} mb={20}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 'bold',
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {product.description}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0px' }}
            >
              Brand: {product.brand}
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Price: ₱{product.sell_price}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ width: '50%' }}
                onClick={addProductToCart}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="large"
                sx={{ width: '40%', marginLeft: 1 }}
              >
                Reviews
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" sx={{ mt: 4 }}>
          Loading product details...
        </Typography>
      )}
    </Container>
  );
};

export default ProductDetailsPage;

