const express = require('express');
const router = express.Router();
const vehicleCtrl = require('../controllers/vehicleController');
const { verifyToken, isManager } = require('../middleware/authMiddleware');

// Drivers can register their own; Managers can see all
router.post('/', verifyToken, vehicleCtrl.registerVehicle);
router.get('/', verifyToken, vehicleCtrl.getVehicles);
router.delete('/:id', verifyToken, isManager, vehicleCtrl.deleteVehicle);

module.exports = router;