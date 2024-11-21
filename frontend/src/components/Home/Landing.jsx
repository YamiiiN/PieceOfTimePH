import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

const LandingNav = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', fontFamily: 'Poppins, sans-serif' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img
            src="/piece logo.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '1rem' }}
          />
          <Button
            href="/"
            color="inherit"
            sx={{ color: '#fff', textTransform: 'none', marginRight: '8px', fontFamily: 'Poppins, sans-serif' }}
          >
            Home
          </Button>
          <Button
            href="/productlisting"
            color="inherit"
            sx={{ color: '#fff', textTransform: 'none', marginRight: '8px', fontFamily: 'Poppins, sans-serif' }}
          >
            Products
          </Button>
          <Button
            href="/about"
            color="inherit"
            sx={{ color: '#fff', textTransform: 'none', marginRight: '8px', fontFamily: 'Poppins, sans-serif' }}
          >
            About
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#fff',
              borderColor: '#fff',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              marginRight: '8px',
              '&:hover': { borderColor: '#aaa' },
            }}
            onClick={() => handleNavigate('/login')}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              textTransform: 'none',
              fontFamily: 'Poppins, sans-serif',
              '&:hover': { backgroundColor: '#f2f2f2' },
            }}
            onClick={() => handleNavigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LandingNav;
