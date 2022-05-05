const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const spaceCtrl = require('../controllers/space.controller');

router.get('/', auth, spaceCtrl.getAllSpaces);
router.get('/findSpaceInStage', auth, spaceCtrl.findSpaceInStage);
router.get('/findSpaceByUser/:id', auth, spaceCtrl.findSpaceByUser);
router.get('/:id', auth, spaceCtrl.getSpace);
router.post('/', auth, spaceCtrl.createSpace);
router.put('/:id', auth, spaceCtrl.updateSpace);
router.delete('/:id', auth, spaceCtrl.deleteSpace);

module.exports = router;