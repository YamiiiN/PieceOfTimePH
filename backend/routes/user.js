const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticated, isAuthenticatedV2 } = require('../middleware/auth');


const {
    register,
    login,
    saveToken,
} = require('../controllers/user');


router.post('/register', upload.array('images'), register)

router.post('/login', login)

router.post('/save/token', isAuthenticatedV2, saveToken)

module.exports = router;