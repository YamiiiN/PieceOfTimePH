import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

const NavBar = ({ username }) => {
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

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map((n) => n.charAt(0).toUpperCase()).join('');
  };

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleProfileMenuClose();
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
          <Button href="/" color="inherit" sx={{ color: '#fff', textTransform: 'none', marginRight: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Home
          </Button>
          <Button href="/productlisting" color="inherit" sx={{ color: '#fff', textTransform: 'none', marginRight: '8px', fontFamily: 'Poppins, sans-serif' }}>
            Products
          </Button>
          <Button href="/about" color="inherit" sx={{ color: '#fff', textTransform: 'none', marginRight: '8px', fontFamily: 'Poppins, sans-serif' }}>
            About
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon sx={{ color: '#fff' }} onClick={handleCartClick} />
            </Badge>
          </IconButton>

          {username ? (
            <Avatar
              sx={{ marginLeft: '1rem', bgcolor: '#fff', color: '#000', cursor: 'pointer' }}
              onClick={handleProfileMenuOpen}
            >
              {getInitials(username)}
            </Avatar>
          ) : (
            <Avatar sx={{ marginLeft: '1rem', bgcolor: '#fff', color: '#000', cursor: 'pointer' }} onClick={handleProfileMenuOpen}>
              <AccountCircleIcon />
            </Avatar>
          )}

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
            <MenuItem onClick={() => handleNavigate('/orders')}>
              <ListAltIcon sx={{ marginRight: '8px' }} />
              <Typography>Orders</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleNavigate('/logout')}>
              <ExitToAppIcon sx={{ marginRight: '8px' }} />
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
