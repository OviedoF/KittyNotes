const {Router} = require('express');
const userController = require('../controllers/users.controller');
const router = Router();

router.get('/login', userController.renderLogin);
router.post('/login', userController.loginUser)

router.get('/register', userController.renderRegister);
router.post('/register', userController.register);

router.get('/users/logout', userController.logout);

module.exports = router;