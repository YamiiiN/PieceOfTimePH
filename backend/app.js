const express = require("express");
const app = express();


//CONFIGS
app.use(express.json());



// IMPORT ROUTES
const productRoutes = require('./routes/product');




// USE ROUTES
app.use('/product', productRoutes);



module.exports = app;