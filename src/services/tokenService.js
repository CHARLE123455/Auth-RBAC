const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

exports.generateToken = (user) => {
    return jwt.sign({ id: user.id,role:user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    
};

exports.verifyToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    }
    catch(e){
        throw new Error('Invalid or expired token');
    }
    
};

exports.saveToken = async (token, userId) => {
    const newToken = new Token({
        token,
        userId
    });
    return await newToken.save();
};

exports.revokeToken = async (token) => {
    await Token.deleteOne({ token });
};

