const express = require('express');
const router = express.Router();
const capitalCtrl = require('../../controllers/api/capital');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, capitalCtrl.create);
router.get('/', ensureLoggedIn, capitalCtrl.index)
router.delete('/:id', ensureLoggedIn, capitalCtrl.delete);
router.put('/:id', ensureLoggedIn, capitalCtrl.update);

module.exports = router;