const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');

router.get('/:id', userCtrl.getUser);

module.exports = router;