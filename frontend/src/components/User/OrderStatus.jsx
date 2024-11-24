import React from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { stepConnectorClasses } from "@mui/material/StepConnector";

// Custom Connector for the Stepper
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
}));

// Custom Step Icon
const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active ? theme.palette.primary.main : "#e0e0e0",
  color: "#fff",
  zIndex: 1,
  width: 30,
  height: 30,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
}));

const steps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const orderInfo = {
  imageUrl: "https://via.placeholder.com/100", // Replace with actual product image URL
  productName: "Wireless Headphones",
  totalPrice: "$89.99",
  placedAt: "November 20, 2024",
  currentStep: 2, // Example: "Shipped" (0-based index)
};

export default function OrderStatus() {
  const { imageUrl, productName, totalPrice, placedAt, currentStep } = orderInfo;

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Order Status
        </Typography>
        
        <Stepper
          alternativeLabel
          activeStep={currentStep}
          connector={<CustomConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={(props) => (
                  <CustomStepIcon ownerState={props}>
                    {props.icon}
                  </CustomStepIcon>
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 3, mt:3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img
                src={imageUrl}
                alt={productName}
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" fontWeight="bold">
                {productName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Price: {totalPrice}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Placed At: {placedAt}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body1" color="textSecondary">
            Current Status: <strong>{steps[currentStep]}</strong>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
