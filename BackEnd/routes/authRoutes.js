const router = require('express').Router();
const AuthController = require('../controllers/authController');

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);

module.exports = router;