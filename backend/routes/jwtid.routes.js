const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const jwtidCtrl = require('../controllers/jwtid.controller');

router.get('/', auth, jwtidCtrl.getJwtid);

module.exports = router;