const {Router} = require('express');
const router = Router();
const indexController = require('../controllers/index.controller');

router.get('/', indexController.renderHome);

module.exports = router;