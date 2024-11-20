import React from 'react';
import Box from '@mui/material/Box';

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      >
        <source src="https://videos.pexels.com/video-files/11899562/11899562-hd_1920_1080_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Content on Top of Video */}
      {/* <Box sx={{ position: 'relative', zIndex: 1, color: '#fff', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>Welcome to Our Site</h1>
        <p style={{ fontFamily: 'Poppins, sans-serif' }}>Explore and learn more about us</p>
      </Box> */}
    </Box>
  );
};  

export default Hero;
