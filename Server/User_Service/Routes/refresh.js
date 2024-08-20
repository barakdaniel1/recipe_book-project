
const express = require('express');
const router = express.Router();
const refreshTokenController = require('../Controllers/users_Controller')

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
