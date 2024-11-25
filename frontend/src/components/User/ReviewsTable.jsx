// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Rating,
//   Tooltip,
//   Button,
//   Typography
// } from "@mui/material";
// import { RateReview } from "@mui/icons-material";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { baseUrl } from "../../assets/constants";

// const reviewsData = [
//   {
//     id: 1,
//     product: "Relo",
//     rating: 4.5,
//     OrderID: "Excellent sound quality!",
//   },
//   {
//     id: 2,
//     product: "Relo",
//     rating: 3.8,
//     OrderID: "Fits well",
//   },
//   {
//     id: 3,
//     product: "Relo",
//     rating: 4.2,
//     OrderID: "Wowers",
//   },
// ];

// const ReviewsTable = () => {

//   const[reviews, setReviews] = useState([]);
//   const { access_token } = useSelector((state) => state.auth);

//   const fetchReviews = async () => {
//     try {
//       const { data } = await axios.get(`${baseUrl}/review/:productId`, {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       });
//       setReviews(data.reviews);
//     } catch (error) {
//       console.error("Failed to fetch reviews:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);


//   return (
//     <TableContainer component={Paper} elevation={3} sx={{ mt: 4 }}>
//       <Table sx={{ minWidth: 650 }} aria-label="reviews table">
//         <TableHead sx={{ bgcolor: "transparent" }}>
//           <TableRow>
//             <TableCell sx={{ color: "green", fontWeight: "bold" }}>Product</TableCell>
//             <TableCell sx={{ color: "green", fontWeight: "bold" }}>Order ID</TableCell>
//             <TableCell sx={{ color: "green", fontWeight: "bold", textAlign: "center" }}>
//               Actions
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {reviews.map((review) => (
//             <TableRow key={review._id}>
//               <TableCell>{review.product.name}</TableCell>
//               <TableCell>{review.comment}</TableCell>
//               <TableCell sx={{ textAlign: "center" }}>
//                 <Tooltip title="Review Product">
//                   <IconButton color="primary">
//                     <RateReview />
//                   </IconButton>
//                 </Tooltip>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };


// export default ReviewsTable;


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { RateReview } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../../assets/constants";

const ReviewsTable = () => {
  const [products, setProducts] = useState([]);
  const { access_token } = useSelector((state) => state.auth);

  // Fetch delivered products
  const fetchDeliveredProducts = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/review/delivered-products`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch delivered products:", error);
    }
  };

  useEffect(() => {
    fetchDeliveredProducts();
  }, []);

  return (
    <TableContainer component={Paper} elevation={3} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Products Ready for Review
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="delivered products table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "green" }}>Product</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "green" }}>Order ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "green" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.productId}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.orderId}</TableCell>
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
