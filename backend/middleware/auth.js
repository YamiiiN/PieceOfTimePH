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
// const isAuthenticated = async (req, res, next) => {
//     // Check if the Authorization header exists
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: "Login first to access this resource" });
//     }

//     // Extract token from the Authorization header
//     const token = authHeader.split(" ")[1];

//     try {
//         // Verify token using Firebase admin SDK
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         const { email } = decodedToken;

//         // Attach user info to the request object
//         req.user = await User.findOne({ email: email });

//         next(); // Call the next middleware

//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ message: 'Invalid or expired token' });
//     }
// };



module.exports = {
    isAuthenticated,
    isAuthenticatedV2
}