import React from "react";
import { CircularProgress, Box, Typography, keyframes } from "@mui/material";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#000000",
        color: "white",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 100,
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress
          size={80}
          thickness={5}
          sx={{
            color: "white",
            animation: `${spin} 1.5s linear infinite`,
          }}
        />
        
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: 3,
          fontWeight: 300,
          textAlign: "center",
          animation: `${fadeIn} 2s infinite`,
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        Hang tight! Loading...
      </Typography>
    </Box>
  );
};

export default Spinner;
