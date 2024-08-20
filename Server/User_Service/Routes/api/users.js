const express = require('express');
const router = express.Router();
const usersController = require('../../Controllers/users_Controller');

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.registerUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

router.route('/:username').get(usersController.getUser);

module.exports = router;