const mongoose = require('mongoose');



const blogModel = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog title is required."],
        trim: true,
    },

    info: {
        type: String,
        required: [true, "Blog info is required."],
        trim: true,
    },

    category: {
        type: String,
        required: [true, 'Please select category for this blog'],
        enum: {
            values: [
                "Vintage Watches",
                'Latest Watches',
                'History',
                'Industry'
            ],
            message: 'Please select correct category for blog'
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

    // ADD DITO COMMENTS

}, { timestamps: true });




module.exports = mongoose.model("Blog", blogModel);