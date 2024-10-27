const mongoose = require('mongoose');


const productModel = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Product Name is required."],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Product description is required."],
        trim: true,
    },

    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                "Classic",
                'Dive',
                'Pilot',
                'Field',
                'Dress',
                'Chronograph',
                'Moon Phase',
                'Vintage'
            ],
            message: 'Please select correct category for product'
        }
    },

    movement: {
        type: String,
        required: [true, 'Please select movement for this product'],
        enum: {
            values: [
                "Mechanical",
                'Automatic',
                'Quartz',
                'Solar',
                'Kinetic'
            ],
            message: 'Please select movement type for product'
        }
    },

    images: [
        {
            public_id: {
                type: String,
                required: true,
            },

            url: {
                type: String,
                required: true,
            }
        }
    ],

    sell_price: {
        type: Number,
        required: [true, 'Please enter seller price'],
    },

    cost_price: {
        type: Number,
        required: [true, 'Please enter product price'],
    },

    stock_quantity: {
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0,
    }

}, { timestamps: true });



module.exports = mongoose.model('Product', productModel)