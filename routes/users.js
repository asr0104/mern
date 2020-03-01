const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/byid/:id', userController.getUserById);
module.exports = router;