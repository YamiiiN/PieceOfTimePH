import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import '@fontsource/poppins';

import { Button, Menu, MenuItem, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../utils/firebase';

const NavBar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleProfileMenuClose();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#000', fontFamily: 'Poppins, sans-serif' }}>
        <Toolbar>
          <Box
            component="a"
            href="/home"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <img
              src="/logoulet (1).png"
              alt="Logo"
              style={{ height: '40px', marginRight: '1rem' }}
            />
            <Typography color="white">
              Piece of Time PH
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              onClick={() => navigate('/cart')}
              sx={{ marginRight: 1.5 }}
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon sx={{ color: '#fff' }} />
              </Badge>
            </IconButton>
            <Button
              href="/product/get/all"
              color="inherit"
              sx={{
                color: '#fff',
                textTransform: 'none',
                marginRight: '8px',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Products
            </Button>
            <Button
              href="/about"
              color="inherit"
              sx={{
                color: '#fff',
                textTransform: 'none',
                marginRight: '8px',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              About
            </Button>

              {/* <Avatar
                sx={{
                  marginLeft: '1rem',
                  bgcolor: '#fff',
                  color: '#000',
                  cursor: 'pointer',
                }}
                onClick={handleProfileMenuOpen}
              >
              </Avatar> */}
              <Avatar
                sx={{
                  marginLeft: '1rem',
                  bgcolor: '#fff',
                  color: '#000',
                  cursor: 'pointer',
                }}
                onClick={handleProfileMenuOpen}
              >
                {/* <AccountCircleIcon /> */}
              </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleProfileMenuClose}
              sx={{ fontFamily: 'Poppins, sans-serif' }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => handleNavigate('/profile')}>
                <PersonIcon sx={{ marginRight: '8px' }} />
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('/orderOfUser')}>
                <ListAltIcon sx={{ marginRight: '8px' }} />
                <Typography>Orders</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <ExitToAppIcon sx={{ marginRight: '8px' }} />
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
