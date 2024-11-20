import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Toolbar, Drawer, Avatar, IconButton, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router for navigation

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const NAVIGATION = [
  { items: [{ label: 'Dashboard', icon: <DashboardIcon /> }] },
  { items: [{ label: 'Reports', icon: <BarChartIcon /> }] },
  { items: [{ label: 'Orders', icon: <ShoppingCartIcon /> }] },
  { items: [{ label: 'Integrations', icon: <LayersIcon /> }] },
];

function Sidebar() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is small (mobile)

  const handleProfileClick = () => {
    navigate('/profile'); // Update this path as needed
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: 'background.paper' },
      }}
    >
      <Toolbar />

      {/* Profile Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          bgcolor: 'background.paper',
          marginLeft: 2,
          paddingBottom: 2,
        }}
        onClick={handleProfileClick}
      >
        <Avatar
          src="/path/to/profile-picture.jpg" // Replace with the actual path to the profile picture
          alt="Admin Profile"
          sx={{ width: 48, height: 48, marginRight: 2 }}
        />
        <Typography variant="subtitle1" color="text.primary">
          Diana Carreon
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ overflow: 'auto', p: 2 }}>
        {NAVIGATION.map((section, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <List>
              {section.items.map((item, index) => (
                <ListItem button key={index}>
                  <ListItemIcon sx={{ color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  {!isSmallScreen && (
                    <ListItemText primary={item.label} /> // Only show label on larger screens
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
}

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
