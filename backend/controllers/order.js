const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Function to create an order
exports.create = async (req, res, next) => {
    try {
        req.body.user = req.user._id;

        const order = await Order.create(req.body);
        const orderItems = order.order_items;

        for (i in orderItems) {
            const product = await Product.findById(orderItems[i].product);
            const updateStock = product.stock_quantity - orderItems[i].quantity;
            product.stock_quantity = updateStock;

            product.save();
        }

        res.json({
            message: "Order success."
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the order.' });
    }
};

// Function to get the sales chart data by month
exports.getMonthlySales = async (req, res, next) => {
    try {
        // Aggregation pipeline to group orders by month and year and calculate total sales for each month
        const salesData = await Order.aggregate([
            {
                $project: {
                    totalPrice: 1,
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    totalSales: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        // Formatting the result into a more useful structure for the frontend (optional)
        const formattedData = salesData.map(data => ({
            year: data._id.year,
            month: data._id.month,
            totalSales: data.totalSales
        }));

        res.json(formattedData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching sales data.' });
    }
};
