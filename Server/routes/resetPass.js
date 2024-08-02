const express = require('express');
const router = express.Router();
const resetPassController = require('../services/user_services/reset_pass_service')

router.post("/",resetPassController.resetPassword);
router.post("/:email",resetPassController.verifyCode);

module.exports = router;
