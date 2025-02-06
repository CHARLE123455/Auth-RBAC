const Role = require('../models/Role');
const User = require('../models/user');
const Permission = require('../models/Permission');


//create role
exports.createRole = async (role) => {
    try {
        return await Role.create(role);
    }
    catch (error) {
        throw new Error("Error creating role");
    }
};

//assign role to user

exports.assignRole = async (userId, roleId) => {
    try {
        const user = await User.findById(userId);
        const role = await Role.findById(roleId);
        if (!user || !role) {
            throw new Error("User or role not found");
        }
        user.role = role;
        return await user.save();
    }
    catch (error) {
        throw new Error("Error assigning role");
    }
};

// has permission
exports.hasPermission = async(userId, action) => {
    try {
        const user = await User.findById(userId).populate({ path: 'role', populate: { path: 'permissions' } });
        return user.role.permissions.some(permission => permission.actions.includes(action));
    }
catch (error) {
    throw new Error("Error checking permission");
}
};