const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthenticatedV2 } = require('../middleware/auth');



const {
    create
} = require('../controllers/order');




router.post('/create', isAuthenticatedV2,create)



module.exports = router;