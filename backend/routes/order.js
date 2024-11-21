const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated } = require('../middleware/auth');


const {
    create
} = require('../controllers/order');



router.post('/create', isAuthenticated, create)



module.exports = router;