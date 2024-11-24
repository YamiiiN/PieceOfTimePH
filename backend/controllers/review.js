const Review = require('../models/Review')
const User = require('../models/User');

exports.create = async (req, res, next) => {
    
    try {

        req.body.user = req.user._id

        console.log(req.body);

        const review = await Review.create(req.body);

        await reviewService.removeCreditReviews({ review: review, pendingId: req.query.pendingId })

        return res.json({
            success: true,
            message: "Successfully created!",
            // review: review,
        })

    } catch (err) {
       console.log(err)
    }

}