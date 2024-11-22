import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, Typography, Button, Paper } from '@mui/material';
import { Rating } from '@mui/material';
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

  const addProductToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity: 1,
        })
      );
    }
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
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
              margin: '0 8px',
              marginTop: '30px',
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
              justifyContent: 'left',
              alignItems: 'center',
              marginTop: '15px',
              gap: '30px',
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
        <Grid container spacing={4} sx={{ mt: 4, marginBottom: '100px' }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Carousel {...settings}>
                {product.images.map((item, index) => (
                  <div key={index}>
                    <img
                      src={item.url}
                      alt={`product ${index}`}
                      style={{
                        width: '100%',
                        height: '500px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box>
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

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Rating
                  name="product-rating"
                  value={product.rating || 0}
                  precision={0.5}
                  readOnly
                />
                <Typography sx={{ ml: 1, fontFamily: 'Poppins, sans-serif' }}>
                  ({product.numReviews || 0} reviews)
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 3,
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ width: '48%' }}
                  onClick={addProductToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  sx={{ width: '48%' }}
                >
                  Reviews
                </Button>
              </Box>
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
