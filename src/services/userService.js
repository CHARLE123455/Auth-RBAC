const User = require('../models/user');

// Register User

exports.registerUser = async(name, email, password, role) => {
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);
        return await User.create({
            name,
            email,
            password: encryptedPassword,
            role
        })
    }
    catch (error) { 
        throw new Error(error);
    };
};

// get user by id

exports.getUserById = async(id) => {
    try {
        return await user.findById(id);
    }
    catch (error) {
        throw new Error("Invalid user id");
    };
};

// get all users
exports.getAllUsers = async() => {
    try {
        return await user.find();
    }
    catch (error) {
        throw new Error("Error fetching users");
    };
};

// update user
exports.updateUser = async(id, data) => {
    try {
        return await user.findByIdAndUpdate(id, data, {new: true});
        }
    catch (error) {
        throw new Error("Error updating user");
    };
    };

// delete user
exports.deleteUser = async(id) => {
    try {
        return await user.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error deleting user");
    };
};
