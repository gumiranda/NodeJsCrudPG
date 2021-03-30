const express = require('express');

const router = express.Router();
const controller = require('../controllers/movie-controller');
const auth = require('../../../middlewares/authentication');

const _ctrl = new controller();

router.post('/', auth, _ctrl.post);
router.get('/', auth, _ctrl.get);
router.get('/getAvailable', auth, _ctrl.getAvailable);
router.put('/:id', auth, _ctrl.put);
router.delete('/:id', auth, _ctrl.delete);

module.exports = router;
