const authService = require('../services/authService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.logout = async (req, res) => {
    try {
        await authService.logoutUser(req.user.id);
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        const newToken = await authService.refreshToken(token);
        res.status(200).json({
            success: true,
            data: { token: newToken }
        });
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        await authService.changePassword(req.user.id, newPassword);
        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};