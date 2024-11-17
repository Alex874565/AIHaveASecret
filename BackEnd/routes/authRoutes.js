const router = require('express').Router();
const AuthController = require('../controllers/authController');

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.registerUser);
router.post('/send_mail', AuthController.sendMail);
router.post('/check_user_existence', AuthController.checkUserExistence);

module.exports = router;