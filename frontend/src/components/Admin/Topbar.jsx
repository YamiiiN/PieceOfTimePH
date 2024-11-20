// src/components/Topbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Topbar = ({ title }) => (
  <AppBar
    position="fixed"
    sx={{
      zIndex: (theme) => theme.zIndex.drawer + 1,
      backgroundColor: '#000',
      width: `calc(100% - 240px)`, 
      ml: '240px',
    }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <IconButton color="inherit">
        <SearchIcon />
      </IconButton>
      
    </Toolbar>
  </AppBar>
);

export default Topbar;
