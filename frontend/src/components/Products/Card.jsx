import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Button, Typography } from '@mui/material';

export default function App() {
  return (
    <Card sx={{maxWidth: "250",
      borderRadius: 3,
      backgroundColor: "#EFECEA",
      marginTop: 5,
      height: "320px"
    }}>
      <CardMedia
        component="img"
        height="250px"
        image="https://mdbootstrap.com/img/new/standard/nature/184.webp"
        alt="Nature"
        sx={{
          maxWidth: "220px",
          borderRadiusTop: 3
        }}
      />
      <CardContent>
        <Typography component="div" >
          Rolex
        </Typography>
        <Typography component="div">
          Daytona
        </Typography>
      </CardContent>
    </Card>
  );
}
