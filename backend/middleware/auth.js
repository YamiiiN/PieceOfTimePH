const User = require('../models/User');
const admin = require('../utils/firebase')

// FIREBASE AUTH
const isAuthenticatedV2 = async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]
    // const { token } = req.cookies

    if (!token) {
        return res.status(401).json({message: "Login first to access this resource"})
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        const { email } = decodedToken;

        req.user = await User.findOne({ email: email });

        // console.log(req.user);

        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }

    // console.log(token);
    // req.user = await User.findById(data.id);

    // console.log(req.user);

    // next()

}


// JWT TOKEN AUTH
const isAuthenticated = async (req, res, next) => {

    if (req.headers.authorization) {
        req.cookies = {
            token: req.headers.authorization.split(" ")[1]
        }
    }
    
    const token = req.cookies?.token
    // const { token } = req.cookies

    
    if (!token) {
        return res.status(401).json({message: "Login first to access this resource"})
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)

    // console.log(data);
    req.user = await User.findById(data.id);

    // console.log(req.user);

    next()

}

module.exports = {
    isAuthenticated,
    isAuthenticatedV2
}