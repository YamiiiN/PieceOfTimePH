const Blog = require('../models/Blog');
const cloudinary = require('cloudinary');


exports.createBlog = async (req, res, next) => {

    try {

        req.body.images = [];

        const images = req.files;

        for (let i = 0; i < images.length; i++) {

            const data = await cloudinary.v2.uploader.upload(images[i].path);

            // console.log(data);

            req.body.images.push({

                public_id: data.public_id,
                url: data.url,

            })
        }

        const blog = await Blog.create(req.body);

        res.json({
            message: "Blog created successfully.",
            blog: blog,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })

    }

}


exports.getAllBlogs = async (req, res, next) => {

    try {

        const blogs = await Blog.find();

        res.json({
            message: "Blogs retrieved.",
            blogs: blogs,
        });


    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })

    }

}



exports.getSingleBlog = async (req, res, next) => {

    try {

        const blog = await Blog.findById(req.params.id);

        res.json({
            message: "Single blog retrieved.",
            blog: blog
        });


    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })

    }

}



exports.updateBlog = async (req, res, next) => {

    try {

        const images = req.files;

        // console.log(images);

        req.body.images = [];

        for (let i = 0; i < images.length; i++) {

            const data = await cloudinary.v2.uploader.upload(images[i].path);

            console.log(data);

            req.body.images.push({

                public_id: data.public_id,

                url: data.url,

            })
        };

        // DELETE EMPTY ARRAY KAPAG HINDI NAG UPDATE NG IMAGES
        if (images.length === 0) {
            delete req.body.images
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "Blog successfully updated.",
            blog: blog,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })

    }
}



exports.deleteBlog = async (req,res,next) => {

    try {

        await Blog.findByIdAndDelete(req.params.id)

        res.json({
            message: "Product deleted successfully."
        })
      
    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })

    }

}