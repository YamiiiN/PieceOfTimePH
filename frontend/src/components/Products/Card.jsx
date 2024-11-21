import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function ProductCard({ product }) {
  return (

    <Card
      sx={{
        maxWidth: "260px",
        borderRadius: 3,
        backgroundColor: "#EFECEA",
        marginTop: 5,
        height: "350px",
        marginBottom: 5,
        overflow: "hidden",
        '&:hover': {
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }
      }}
    >
      <CardMedia
        component="img"
        height="280px"
        src={product.images[0].url}
        alt="Nature"
        sx={{
          maxWidth: "260px",
          borderRadiusTop: 3,
          transition: "transform 0.3s ease, opacity 0.3s ease",
          '&:hover': {
            transform: "scale(1.1)",
            opacity: 1,
          }
        }}
      />
      <CardContent
        sx={{
          margin: 2,
          padding: 0,
          fontSize: "8px",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: "13px",
            fontFamily: "Poppins, sans-serif",
            transition: "color 0.3s ease",
          }}
        >
          {product.brand}
        </Typography>
        <Typography
          component="div"
          sx={{
            fontSize: "13px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            transition: "color 0.3s ease",
          }}
        >
         { product.name}
        </Typography>
      </CardContent>
    </Card>


  );
}