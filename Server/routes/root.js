const express = require('express');
const router = express.Router();

router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile("../view/login.html",{root: __dirname});
});

module.exports = router;