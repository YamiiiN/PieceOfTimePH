const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");


const {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blog')



router.post('/create', upload.array('images'),createBlog);

router.get('/get/all', getAllBlogs)

router.get('/:id', getSingleBlog)

router.put('/update/:id',  upload.array('images'), updateBlog)

router.delete('/delete/:id', deleteBlog)




module.exports = router;