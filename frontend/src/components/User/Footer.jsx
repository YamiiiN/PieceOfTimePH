import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: 'white',
        textAlign: 'center',
        padding: '16px 0',
        marginTop: 3
      }}
    > 
        <Typography variant="body2" sx={{fontFamily: 'Poppins, sans-serif'}}>
          © 2024 Copyright:&nbsp;
          <a href="https://facebook.com/pieceoftime.ph" style={{ color: 'inherit', textDecoration: 'none', fontFamily: 'Poppins, sans-serif' }}>
            Piece of Time PH
          </a>
        </Typography>
    </Box>
  );
}
