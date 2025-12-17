const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Public routes (No token needed to join or log in)
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;