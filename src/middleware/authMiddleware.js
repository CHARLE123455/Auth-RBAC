const jwt = require('jsonwebtoken');
const { verifyToken } = require('../services/tokenService');
const User = require('../models/user');

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

// Authorize role access
exports.authencticateRole = (requiredRole) => async (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
}; 