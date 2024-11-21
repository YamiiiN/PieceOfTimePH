import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import '@fontsource/poppins'; 

const NavBar = ({ username }) => {
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map((n) => n.charAt(0).toUpperCase()).join('');
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
          <Button href="/" color="inherit" sx={{ color: '#fff', textTransform: 'none', marginRight: '2px', fontFamily: 'Poppins, sans-serif' }}>
            Home
          </Button>
          <Button href="/products" color="inherit" sx={{ color: '#fff', textTransform: 'none', marginRight: '2px', fontFamily: 'Poppins, sans-serif' }}>
            Products
          </Button>
          <Button href="/about" color="inherit" sx={{ color: '#fff', textTransform: 'none', marginRight: '2px', fontFamily: 'Poppins, sans-serif' }}>
            About
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon sx={{ color: '#fff' }} />
            </Badge>
          </IconButton>

          {username ? (
            <Avatar sx={{ marginLeft: '1rem', bgcolor: '#fff', color: '#000' }}>
              {getInitials(username)}
            </Avatar>
          ) : (
            <Avatar sx={{ marginLeft: '1rem', bgcolor: '#fff', color: '#000' }}>
              <AccountCircleIcon />
            </Avatar>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
