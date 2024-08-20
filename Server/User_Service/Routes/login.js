const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/users_Controller');

router.post("/", loginController.login);

module.exports = router;
