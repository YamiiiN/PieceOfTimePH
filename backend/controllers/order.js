const Order = require('../models/Order');
const Product = require('../models/Product');
const transporter = require('../utils/mailer');

;
const mongoose = require('mongoose');

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

exports.getMonthlySales = async (req, res, next) => {
    try {
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



exports.all = async (req, res, next) => {

    try {

        const orders = await Order.find()
            .populate({
                path: 'order_items.product',
                select: 'name images quantity sell_price'
            })
            .populate({
                path: 'user',
                select: 'first_name last_name email images',
            })
        // console.log(orders)
        res.json({
            message: "Order Lists.",
            orders: orders
        })

    } catch (error) {

        console.log(error)

    }
}

// WORKING UPDATE STATUS NG ORDER W/O EMAIL 
// exports.updateStatus = async (req, res, next) => {

//     try {

//         const newStatus = req.body.status;

//         const order = await Order.findById(req.params.id);
//         order.status = newStatus;
//         order.save();

//         res.json({
//             message: "Order Lists.",
//             orders: orders
//         })

//     } catch (error) {

//         console.log(error)

//     }

// }


const sendOrderUpdateEmail = async (orderId) => {
    try {
        console.log("Fetching order for email...");
        const order = await Order.findById(orderId).populate('user').populate('order_items.product');
        if (!order) {
            console.error("Order not found");
            throw new Error("Order not found");
        }

        console.log("Order fetched:", order);
        const { user, order_items, total_amount } = order;

        if (!user || !user.email) {
            console.error("User email is missing:", user);
            throw new Error("User email is missing");
        }

        const emailContent = `
            <h2>Order Update Notification</h2>
            <p>Dear ${user.first_name} ${user.last_name},</p>
            <p>Your order has been updated to ${order.status} . Here are the details:</p>
            <table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr>
                        <th>Product/Service</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${order_items
                .map(
                    (item) => `
                                <tr>
                                    <td>${item.product.name}</td>
                                    <td>${item.quantity}</td>
                                    <td>$${item.product.sell_price}</td>
                                    <td>$${(item.quantity * item.product.sell_price)}</td>
                                </tr>
                            `
                )
                .join('')}
                </tbody>
            </table>
             <h3>Grand Total: $${order_items
                .reduce((total, item) => total + item.quantity * item.product.sell_price, 0)}</h3>  <!-- Sum of all subtotals -->
            <p>Thank you for choosing us!</p>
        `;

        const mailOptions = {
            from: 'Piece of Time PH',
            to: user.email,
            subject: 'Order Update Notification',
            html: emailContent,
        };

        console.log("Sending email...");
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error in sendOrderUpdateEmail:", error.message);
        throw error; // Let the calling function handle it
    }
};
exports.sendOrderUpdateEmail = sendOrderUpdateEmail;


// TRIAL 1
// exports.updateStatus = async (req, res) => {
//     const { status } = req.body;
//     const { id } = req.params;

//     try {
//         const order = await Order.findById(id)
//             .populate('user')
//             .populate('order_items.product');

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Update order status
//         order.status = status;
//         await order.save();

//         // Send email with updated order details
//         await sendOrderUpdateEmail(order);

//         res.status(200).json({ message: 'Order status updated and email sent.' });
//     } catch (error) {
//         console.error("Error updating order status:", error.message);
//         res.status(500).json({ message: "Failed to update order status or send email." });
//     }
// };
exports.updateStatus = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        console.log(`Updating order ${id} to status: ${status}`);
        const order = await Order.findById(id).populate('user').populate('order_items.product');
        if (!order) {
            console.error("Order not found");
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();
        console.log("Order status updated, now sending email...");

        await sendOrderUpdateEmail(order._id);

        res.status(200).json({ message: 'Order status updated and email sent.' });
    } catch (error) {
        console.error("Error in updateStatus:", error.message);
        res.status(500).json({ message: error.message });
    }
};
