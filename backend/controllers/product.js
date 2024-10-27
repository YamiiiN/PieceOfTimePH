const Product = require('../models/Product');
const cloudinary = require('cloudinary');


exports.createProduct = async (req, res, next) => {

    try {

        // console.log(req.body);
        // console.log(req.files);

        // EMPTY ARRAY PARA SA IMAGES
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

        const product = await Product.create(req.body);

        res.json({
            message: "Product created successfully.",
            product: product,
        })

    } catch (error) {

        console.log(error)

        return res.json({
            message: 'System error occured.',
            success: false,
        })

    }

}



exports.getAllProducts = async (req, res, next) => {

    try {

        const products = await Product.find();

        res.json({
            message: "Products retrieved.",
            products: products,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })


    }

}



exports.getSingleProduct = async (req, res, next) => {

    try {

        const product = await Product.findById(req.params.id);

        res.json({
            message: "Single product retrieved!",
            product: product,
        })

    } catch (error) {

        console.log(error)

        return res.json({
            message: 'System error occured.',
            success: false,
        })


    }

}



exports.updateProduct = async (req, res, next) => {

    try {

        // console.log(req.body);
        // console.log(req.params);
        // console.log(req.files);

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

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "Product successfully updated.",
            product: product,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured.',
            success: false,
        })


    }

}



exports.deleteProduct = async (req, res, next) => {

    try {

        await Product.findByIdAndDelete(req.params.id)

        res.json({
            message: "Product deleted successfully."
        })

    } catch (error) {

        console.log(error)

        return res.json({
            message: 'System error occured.',
            success: false,
        })


    }

}