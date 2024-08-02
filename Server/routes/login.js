const express = require('express');
const router = express.Router();
const loginController = require('../controllers/users_Controller');

router.post("/", loginController.login);

module.exports = router;
