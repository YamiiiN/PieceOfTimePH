const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const { isAuthenticated } = require('../middleware/auth');
    

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');



router.post('/create',upload.array('images'), createProduct);

router.get('/get/all', getAllProducts);

router.get('/:id', getSingleProduct);

router.put('/update/:id', upload.array('images'), updateProduct)

router.delete('/delete/:id', deleteProduct)


module.exports = router;