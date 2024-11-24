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
import { Edit, RateReview } from "@mui/icons-material";

const reviewsData = [
  {
    id: 1,
    product: "Relo",
    rating: 4.5,
    OrderID: "Excellent sound quality!",
  },
  {
    id: 2,
    product: "Relo",
    rating: 3.8,
    OrderID: "Fits well",
  },
  {
    id: 3,
    product: "Relo",
    rating: 4.2,
    OrderID: "Wowers",
  },
];

const ReviewsTable = () => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="reviews table">
        <TableHead sx={{ bgcolor: "transparent" }}>
          <TableRow>
            <TableCell sx={{ color: "green", fontWeight: "bold" }}>Product</TableCell>
            <TableCell sx={{ color: "green", fontWeight: "bold" }}>Order ID</TableCell>
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
                {row.OrderID}
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title="Review Product">
                  <IconButton color="primary">
                    <RateReview />
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

export default ReviewsTable;
