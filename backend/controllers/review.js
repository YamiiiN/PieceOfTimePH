// const Review = require('../models/Review')
// const User = require('../models/User');
// const Order = require('../models/Order');

// // exports.create = async (req, res, next) => {
    
// //     try {

// //         req.body.user = req.user._id

// //         console.log(req.body);

// //         const review = await Review.create(req.body);

// //         await reviewService.removeCreditReviews({ review: review, pendingId: req.query.pendingId })

// //         return res.json({
// //             success: true,
// //             message: "Successfully created!",
// //             // review: review,
// //         })

// //     } catch (err) {
// //        console.log(err)
// //     }

// // }

// // Add a review
// exports.addReview = async (req, res) => {
//     try {
//         const { productId, rating, comment } = req.body;
//         const userId = req.user.id; // Extracted from authenticated user middleware

//         // Check if the user has purchased the product
//         const userOrders = await Order.find({ user: userId, status: 'finished' })
//             .populate('order_items.product');

//         const hasPurchased = userOrders.some(order =>
//             order.order_items.some(item => item.product._id.toString() === productId)
//         );

//         if (!hasPurchased) {
//             return res.status(403).json({ message: 'You can only review products you have purchased.' });
//         }

//         // Create and save the review
//         const review = await Review.create({
//             user: userId,
//             product: productId,
//             comment,
//             rating,
//         });

//         res.status(201).json({ success: true, review });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Get reviews for a product
// // exports.getProductReviews = async (req, res) => {
// //     try {
// //         const { productId } = req.params;
// //         const reviews = await Review.find({ product: productId }).populate('user', 'name');
// //         res.status(200).json({ success: true, reviews });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: error.message });
// //     }
// // };
// // Get products from delivered orders
// exports.getDeliveredProducts = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         // Fetch orders with status 'delivered'
//         const deliveredOrders = await Order.find({ user: userId, status: 'delivered' })
//             .populate('order_items.product', 'name');

//         // Extract products from delivered orders
//         const products = deliveredOrders.flatMap(order =>
//             order.order_items.map(item => ({
//                 productId: item.product._id,
//                 productName: item.product.name,
//                 orderId: order._id,
//             }))
//         );

//         res.status(200).json({ success: true, products });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

