const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated } = require('../middleware/auth');


const {
    register,
    login,
} = require('../controllers/user');


router.post('/register', isAuthenticated,upload.array('images'), register)

router.post('/login', isAuthenticated,login)

module.exports = router;