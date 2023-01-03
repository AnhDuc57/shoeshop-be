const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        return next();
    } catch (error) {
        console.log(error);
        switch (error.name) {
            case 'TokenExpiredError':
                return res.status(403).json({ status: 403, message: 'Token expired' });
            case 'JsonWebTokenError':
                return res.status(401).json({ status: 401, message: 'Token invalid' });
            default:
                return res.status(400).json({ status: 400, message: 'Bad request' });
        }
    }
};
module.exports = { verify };
