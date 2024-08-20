const express = require('express');
const router = express.Router();
const logoutController = require('../Controllers/users_Controller')

router.get("/", logoutController.logout);

module.exports = router;
