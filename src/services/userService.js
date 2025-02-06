const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register User
exports.registerUser = async (name, email, password, role) => {
    try {
        if (!password) throw new Error("Password is required");

        const encryptedPassword = await bcrypt.hash(password, 10);
        return await User.create({ name, email, password: encryptedPassword, role });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get user by id
exports.getUserById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error("Invalid user ID");
    }
};

// Get all users
exports.getAllUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        throw new Error("Error fetching users");
    }
};

// Update user
exports.updateUser = async (id, data) => {
    try {
        return await User.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error("Error updating user");
    }
};

// Delete user
exports.deleteUser = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting user");
    }
};
