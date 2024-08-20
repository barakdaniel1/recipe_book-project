const express = require('express');
const router = express.Router();
const resetPassController = require('../Controllers/users_Controller')

router.post("/",resetPassController.handleResetPass);
router.post("/:email",resetPassController.handleVerifyCode);

module.exports = router;
