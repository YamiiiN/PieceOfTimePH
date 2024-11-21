const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')


const {
    register,
    login,
} = require('../controllers/user');


router.post('/register', upload.array('images'), register)

router.post('/login', login)

module.exports = router;