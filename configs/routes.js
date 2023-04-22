const express = require('express');
const healthCheckController = require('../controllers/health.controller');
const { registerUserController, loginUserController } = require('../controllers/user.controller');

const router =express.Router();

router.get('/health', healthCheckController);
router.post('/register', registerUserController);
router.post('/login', loginUserController);


module.exports = router;