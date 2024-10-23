const app = require('./app')
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect')


dotenv.config({ path: './.env' });


dbConnect();


app.listen(process.env.PORT, () => {
    console.log(`Server Running: http://localhost:${process.env.PORT}`)
})