const express = require('express');
const healthCheckController = require('../controllers/health.controller');
const { registerUserController } = require('../controllers/user.controller');

const router =express.Router();

router.get('/', healthCheckController);
router.post('/register', registerUserController);

module.exports = router;