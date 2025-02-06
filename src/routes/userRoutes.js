
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT, authencticateRole} = require('../middleware/authMiddleware');

router.post('/', authenticateJWT, authencticateRole('admin'), userController.createUser);
router.get('/', authenticateJWT, authencticateRole('admin'), userController.getAllUsers);
router.get('/:id',authenticateJWT, authencticateRole('admin'), userController.getUserById);
router.put('/:id', authenticateJWT, authencticateRole('admin'), userController.updateUser);
router.delete('/:id', authenticateJWT, authencticateRole('admin'), userController.deleteUser);

module.exports = router;
