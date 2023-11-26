const express = require('express');
const router = express.Router();
const resetPassController = require('../controllers/resetPassController')

router.post("/",resetPassController.resetPassword);
router.get("/:email",resetPassController.getCode);

module.exports = router;
