const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT, authorize } = require('../middleware/authMiddleware');

router.post('/register', userController.createUser);

router.get('/all', 
    authenticateJWT, 
    authorize('admin'), 
    userController.getAllUsers
);

router.get('/:id', 
    authenticateJWT, 
    authorize('admin'), 
    userController.getUserById
);

router.put('/:id', 
    authenticateJWT, 
    authorize('admin'), 
    userController.updateUser
);

router.delete('/:id', 
    authenticateJWT, 
    authorize('admin'), 
    userController.deleteUser
);

module.exports = router;