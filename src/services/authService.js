const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Token = require('../models/Token');

//Generate token
exports.generateToken = (user) => {
    return jwt.sign({ id: user.id,role:user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    
};


// Login User

exports.loginUser = async(email, password) => {
    try {
        const user = await User.findOne({where: { email}});
        if (!user) {
            throw new Error('User not found');
            }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');    
        }
        const token = generateToken(user);
        return {user, token};

        }
    catch (error) {
        throw new Error("login failed: " + error.message);
    }
};

// logout User
exports.logoutUser = async(userId) => {
    try {
        await Token.deleteOne({ userId });
    }
    catch (error) {
        throw new Error("logout failed: " + error.message);
    }
};

//refresh User token
exports.refreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return generateToken(decoded);
} catch (error) {
        throw new Error("Invalid or expired token");
    }
};

// change password
exports.changePassword = async (userId, newPassword) => {
    try {
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        return await user.findByIdAndUpdate(userId, { password: encryptedPassword }, { new: true });
    }
    catch (error) {
        throw new Error("Error updating password");
    }
};