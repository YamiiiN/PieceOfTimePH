const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthenticatedV2 } = require('../middleware/auth');


const {
    create,
    getMonthlySales
} = require('../controllers/order');


router.get('/orders/monthly-sales', getMonthlySales);


router.post('/create', isAuthenticatedV2,create)



module.exports = router;