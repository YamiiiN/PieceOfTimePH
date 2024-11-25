const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const { isAuthenticated, isAuthenticatedV2, authorizeRoles } = require('../middleware/auth');


const {
    createProduct, // admin
    getAllProducts,
    getSingleProduct, 
    updateProduct,
    deleteProduct
} = require('../controllers/product');



router.post('/create', isAuthenticatedV2, upload.array('images'), createProduct);

router.get('/get/all', isAuthenticatedV2, getAllProducts);

router.get('/:id', isAuthenticatedV2, getSingleProduct);

router.put('/update/:id', isAuthenticatedV2, upload.array('images'), updateProduct)

router.delete('/delete/:id', isAuthenticatedV2, deleteProduct)


module.exports = router;