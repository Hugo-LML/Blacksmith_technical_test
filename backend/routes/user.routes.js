const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const userCtrl = require('../controllers/user.controller');

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getUser);
router.put('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;