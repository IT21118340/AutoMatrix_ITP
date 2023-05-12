const express = require('express');
const router = express.Router();
const investmentsCtrl = require('../../controllers/api/investment');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/', ensureLoggedIn, investmentsCtrl.create);
router.get('/', ensureLoggedIn, investmentsCtrl.index)
router.delete('/:id', ensureLoggedIn, investmentsCtrl.delete);
router.put('/:id', ensureLoggedIn, investmentsCtrl.update);

module.exports = router;
