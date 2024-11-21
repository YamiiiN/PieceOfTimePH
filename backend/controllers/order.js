const Order = require('../models/Order');
const Product = require('../models/Product')


exports.create = async (req, res, next) => {

    try {
        req.body.user = req.user._id

        const order = await Order.create(req.body);

        const orderItems = order.order_items;

        for (i in orderItems) {
            const product = await Product.findById(orderItems[i].product)
            const updateStock = product.stock_quantity - orderItems[i].quantity;
            product.stock_quantity = updateStock;

            product.save()
        }


        res.json({
            message: "Order success."
        })

    } catch (error) {

        console.log(error)

    }

}