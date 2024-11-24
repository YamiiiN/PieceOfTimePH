const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthenticatedV2 } = require('../middleware/auth');

require('dotenv').config();
const Order = require('../models/Order');

const {
    create,
    all,
    updateStatus,
    // getUserOrders,
} = require('../controllers/order');




router.post('/create', isAuthenticatedV2, create);

router.get('/all', isAuthenticatedV2, all);

router.put('/update/status/:id', isAuthenticatedV2, updateStatus);

// router.get('/order/orderOfUser', isAuthenticatedV2, getUserOrders);




module.exports = router;