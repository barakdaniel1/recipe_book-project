
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/users_Controller')

router.post("/", registerController.registerUser);

module.exports = router;
