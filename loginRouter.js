const express = require('express');
const router = express.Router();

const loginController = require('./loginController');

router.post('/', loginController.loginVerify)
router.post('/new', loginController.processNewUser)

module.exports = router




