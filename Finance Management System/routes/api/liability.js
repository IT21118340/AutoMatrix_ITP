const express = require('express');
const router = express.Router();
const liabilitiesCtrl = require('../../controllers/api/liability');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, liabilitiesCtrl.create);
router.get('/', ensureLoggedIn, liabilitiesCtrl.index)
router.delete('/:id', ensureLoggedIn, liabilitiesCtrl.delete);
router.put('/:id', ensureLoggedIn, liabilitiesCtrl.update);

module.exports = router;

