import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Tabs,
  Tab,
  Grid,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import ReviewsIcon from '@mui/icons-material/Reviews';
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HistoryIcon from "@mui/icons-material/History";
import ReviewsTable from "./ReviewsTable";
import MyReviews from "./MyReviews";
import OrderStatus from "./OrderStatus";

import UserOrderList from "./UserOrderList";
import OrdersList from "../Admin/OrderList";

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(14),
  height: theme.spacing(14),
  borderRadius: "50%",
  boxShadow: theme?.shadows?.[6] || "0px 6px 12px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const TabPanel = ({ value, index, children }) => {
  return value === index ? <Box sx={{ p: 3 }}>{children}</Box> : null;
};

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "Diana Carreon",
    email: "carreondianaaa@gmail.com",
    username: "dayannnn",
    password: "******",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const saveProfile = () => {
    console.log("Profile saved:", formData);
    setEditMode(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    console.log("Logged Out");
    // LAGAY UNG LOG OUT CODE DITO
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        mt: 3,
        px: { xs: 2, md: 6 },
        background: "#fff",
        minHeight: "100vh",
        padding: 4,
      }}
    >
      {/* Profile Header Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: 6,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ProfileAvatar alt={formData.fullName} src="/static/images/avatar/1.jpg" />
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, mt: 2 }}>
          {formData.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Customer
        </Typography>
        <Divider sx={{ my: 2, width: "100%" }} />

        {/* EDIT NG ACCOUNT INFO */}
        <Box sx={{ width: "100%", textAlign: "left", mt: 2 }}>
          {["fullName", "email", "username", "password"].map((field) => (
            <Box key={field} sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {field === "fullName"
                  ? "Full Name"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </Typography>
              {editMode ? (
                <TextField
                  fullWidth
                  size="small"
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                />
              ) : (
                <Typography variant="body1">{formData[field]}</Typography>
              )}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3, width: "80%" }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
          <Button
            variant={editMode ? "contained" : "outlined"}
            size="small"
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: editMode ? "#007BFF" : "#0098ff",
                color: editMode ? "#ffffff" : "",
              },
            }}
            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
            onClick={editMode ? saveProfile : toggleEditMode}
          >
            {editMode ? "Save Profile" : "Edit Profile"}
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<LogoutIcon />}
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      </Box>

      {/* TABS AND NAV */}
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: 6,
          padding: 3,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          sx={{
            marginBottom: 3,
            "& .MuiTab-root": {
              textTransform: "capitalize",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#666",
              "&:hover": {
                color: "#4bc6f5",
              },
            },
          }}
        >
          <Tooltip title="Review a Product" arrow>
            <Tab label={<StarIcon />} />
          </Tooltip>
          <Tooltip title="Your Reviews" arrow>
            <Tab label={<ReviewsIcon />} />
          </Tooltip>
          <Tooltip title="Order Status" arrow>
            <Tab label={<ShoppingBagIcon />} />
          </Tooltip>
          <Tooltip title="Order History" arrow>
            <Tab label={<HistoryIcon />} />
          </Tooltip>
        </Tabs>

        {/* Tab Content */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Review Product
          </Typography>
          <ReviewsTable />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            My Reviews
          </Typography>
          <MyReviews />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            My Order Status
          </Typography>
          <OrderStatus />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <UserOrderList />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ProfilePage;