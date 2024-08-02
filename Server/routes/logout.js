const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/users_Controller')

router.get("/", logoutController.logout);

module.exports = router;
