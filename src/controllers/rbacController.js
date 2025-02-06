const roleService = require('../services/rbacService');

exports.createRole = async (req, res) => {
    try {
        const role = await rbacService.createRole(req.body);
        res.status(201).json({ success: true, data: role });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAllRoles = async (req, res) => {  // <-- Add this function
    try {
        const roles = await rbacService.getAllRoles();
        res.status(200).json({ success: true, data: roles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.assignRole = async (req, res) => {
    try {
        const { userId, roleId } = req.body;
        const user = await rbacService.assignRole(userId, roleId);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.checkPermission = async (req, res) => {
    try {
        const { action } = req.query;
        const hasPermission = await rbacService.hasPermission(req.user.id, action);
        res.status(200).json({ success: true, data: { hasPermission } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
