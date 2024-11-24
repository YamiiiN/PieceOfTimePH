const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthenticatedV2 } = require('../middleware/auth');

require('dotenv').config();
const Order = require('../models/Order');
const { sendOrderUpdateEmail } = require('../controllers/order')

const {
    create,
    all,
    updateStatus,
    getMonthlySales
} = require('../controllers/order');


router.get('/orders/monthly-sales', getMonthlySales);


router.post('/create', isAuthenticatedV2, create)

router.get('/all', all)

// router.post('/update/status/:id', updateStatus)

// Update order status and send email
router.post('/update/status/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Send email to the customer
        await sendOrderUpdateEmail(order._id);

        res.status(200).json({ message: "Order status updated and email sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;