const mongoose = require('mongoose')


const userModel = new mongoose.Schema({

    first_name: {
        type: String,
        required: [true, "First Name is required."],
        trim: true,
    },

    last_name: {
        type: String,
        required: [true, "Last Name is required."],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required."],
        trim: true,
    },

    password: {
        type: String,
        required: [true, "Password is required."],
        trim: true,
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

    role: {
        type: String,
        default: 'user'
    },


}, { timestamps: true });




module.exports = mongoose.model('User', userModel)