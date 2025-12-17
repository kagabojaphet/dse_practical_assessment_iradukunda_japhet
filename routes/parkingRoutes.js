const express = require('express');
const router = express.Router();
const parkingCtrl = require('../controllers/parkingController');
const { verifyToken, isManager } = require('../middleware/authMiddleware');
const { validateEntry } = require('../middleware/validator'); // Import here

// Route with Validation
router.post('/entry', verifyToken, isManager, validateEntry, parkingCtrl.enterParking);

router.put('/exit/:id', verifyToken, isManager, parkingCtrl.exitParking);
router.get('/history', verifyToken, parkingCtrl.getHistory);
router.get('/revenue', verifyToken, isManager, parkingCtrl.getRevenueReport);

module.exports = router;