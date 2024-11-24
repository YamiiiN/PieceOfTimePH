// const User = require('../models/user')
// const Product = require('../models/product')
// const Review = require('../models/review')
const User = require('../models/User');
const Product = require('../models/Product');
const Review = require('../models/Review')

exports.addCreditReviews = async ({ order }) => {

    try {

        const orderItems = order.orderItems;
        const user = await User.findById(order.user)
        const userReviews = JSON.parse(JSON.stringify(user.pendingReviews));

        for (index in orderItems) {

            const item = orderItems[index];

            userReviews.push({
                product: item.product,
                order: order._id,
            });

        }

        user.pendingReviews = userReviews;

        user.save();

    } catch (err) {
        console.log(err);
        return 0
    }
}

exports.removeCreditReviews = async ({ review, pendingId }) => {

    try {

        const user = await User.findById(review.user)
        const userReviews = JSON.parse(JSON.stringify(user.pendingReviews));

        const filterReviews = userReviews.filter(pending => pending._id.toString() !== pendingId);

        user.pendingReviews = filterReviews;

        await user.save();

        const reviews = await Review.find({ product: review.product });

        const product = await Product.findById(review.product);

        product.ratings = (product.ratings + review.rating) / reviews.length;

        await product.save();



    } catch (err) {
        console.log(err);
        return 0
    }
}