const jwt = require('jsonwebtoken');
const { verifyToken } = require('../config/jwtConfig');

// Authenticate JWT
exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = verifyToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token is not valid' });
    }
};

// Authorize admin access
exports.authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to access this section' });
    }
    next();
};
