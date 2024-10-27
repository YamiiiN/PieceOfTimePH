const express = require("express");
const app = express();


//CONFIGS
app.use(express.json());



// IMPORT ROUTES
const productRoutes = require('./routes/product');
const blogRoutes = require('./routes/blog');



// USE ROUTES
app.use('/product', productRoutes);
app.use('/blog', blogRoutes);


module.exports = app;