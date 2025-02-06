const express = require('express');
const router = express.Router();
const rbacController = require('../controllers/rbacController');
const { authenticateJWT, authorize } = require('../middleware/authMiddleware');

router.post('/roles', 
    authenticateJWT, 
    authorize(['create_role']), 
    rbacController.createRole
);

router.get('/roles', 
    authenticateJWT, 
    authorize(['view_roles']), 
    rbacController.getAllRoles
);

router.post('/roles/assign', 
    authenticateJWT, 
    authorize(['assign_role']), 
    rbacController.assignRole
);

router.get('/permissions/check', 
    authenticateJWT, 
    rbacController.checkPermission
);

module.exports = router;