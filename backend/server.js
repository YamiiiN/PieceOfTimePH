const app = require('./app')
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect')
const cloudinary = require('cloudinary');



dotenv.config({ path: './.env' });


cloudinary.v2.config({
    cloud_name: 'dlqclovym',
    api_key: '714723275263638',
    api_secret: '7xnuod_GoSOFgiZbuyf8l8040eQ'
})



dbConnect();




app.listen(process.env.PORT, () => {
    console.log(`Server Running: http://localhost:${process.env.PORT}`)
})