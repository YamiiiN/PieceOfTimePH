const express = require('express');
const router = express.Router();
// const Review = require('../controllers/review');

const {
    create
} = require('../controllers/review');


router.post('/create', create);

module.exports = router;