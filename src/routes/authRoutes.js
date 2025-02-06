const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateJWT, authorize } = require('../middleware/authMiddleware');

router.post('/login', authController.login);

router.post('/logout', authenticateJWT, authController.logout);

router.post('/refresh-token', authController.refreshToken);

router.put('/change-password',authenticateJWT, authorize(['change_password']), authController.changePassword
);

module.exports = router;