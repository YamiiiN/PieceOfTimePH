import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Rating,
  Tooltip,
  Button,
  Typography
} from "@mui/material";
import { Edit, RateReview, Delete } from "@mui/icons-material";

const reviewsData = [
  {
    id: 1,
    product: "Relo",
    rating: 4.5,
    comment: "Excellent sound quality!",
  },
  {
    id: 2,
    product: "Relo",
    rating: 3.8,
    comment: "Fits well",
  },
  {
    id: 3,
    product: "Relo",
    rating: 4.2,
    comment: "Wowers",
  },
];

const MyReviews = () => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="reviews table">
        <TableHead sx={{ bgcolor: "transparent" }}>
          <TableRow>
            <TableCell sx={{ color: "green", fontWeight: "bold" }}>Product</TableCell>
            <TableCell sx={{ color: "green", fontWeight: "bold" }}>Ratings</TableCell>
            <TableCell sx={{ color: "green", fontWeight: "bold" }}>Comment</TableCell>
            <TableCell sx={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviewsData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.product}</TableCell>
              <TableCell>
                <Rating value={row.rating} precision={0.1} readOnly />
              </TableCell>
              <TableCell>{row.comment}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title="Update">
                  <IconButton color="secondary">
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Update">
                  <IconButton sx={{color:"#FF0000"}}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyReviews;
