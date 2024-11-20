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
      }}
    > 
        <Typography variant="body2">
          © 2024 Copyright:&nbsp;
          <a href="https://mui.com/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Piece of Time PH
          </a>
        </Typography>
    </Box>
  );
}
