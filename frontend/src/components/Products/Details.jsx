import React from 'react';
import { Container, Grid, Box, Typography, Button, Paper } from '@mui/material';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const ProductDetailsPage = ({ product }) => {
  const { title, description, brand, movement, price, images } = product;

  const settings = {
    customPaging: (index) => (
      <img
        src={images[index]}
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
  };

  return (
    <Container>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Carousel Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Carousel {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
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
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {description}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ fontFamily: 'Poppins, sans-serif', marginBottom: '0px' }}
          >
            {brand}
          </Typography>
          <Typography
            color="text.secondary"
            paragraph
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              marginTop: '0px',
            }}
          >
            {movement}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: 'Poppins, sans-serif',
              marginTop: '200px',
            }}
          >
            Price: ${price}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{ width: '50%' }}
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
    </Container>
  );
};

export default ProductDetailsPage;
