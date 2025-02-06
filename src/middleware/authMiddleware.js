// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { verifyToken } = require('../services/tokenService');

// Authentication middleware
exports.authenticateJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        const token = authHeader.split(' ')[1];
        
        const decoded = verifyToken(token);
        
        const user = await User.findById(decoded.id)
            .populate({ 
                path: 'role',
                populate: { path: 'permissions' }
            });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        req.user = user;
        req.token = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message || 'Invalid token'
        });
    }
};

// Auhorization middleware
exports.authorize = (roleOrPermission) => async (req, res, next) => {
    try {
        const user = req.user;

        
        if (typeof roleOrPermission === 'string') {
            if (user.role.name !== roleOrPermission) {
                return res.status(403).json({
                    success: false,
                    message: ' role not permitted'
                });
            }
        } 
        
        else if (Array.isArray(roleOrPermission)) {
            const hasPermission = roleOrPermission.some(permission =>
                user.role.permissions.some(p => 
                    p.actions.includes(permission)
                )
            );

            if (!hasPermission) {
                return res.status(403).json({
                    success: false,
                    message: ' permission not granted'
                });
            }
        }

        next();
    } catch (error) {
        res.status(403).json({
            success: false,
            message: error.message || 'Authorization failed'
        });
    }
};