const router = require('express').Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController')

router.post('/create', AuthController.checkToken, UserController.createUser);
router.post('/delete/:name', AuthController.checkToken, UserController.deleteUser);
router.post('/update/:name', AuthController.checkToken, UserController.updateUser);
router.post('/find/:name', AuthController.checkToken, UserController.findUser);
router.post('/findall', AuthController.checkToken, UserController.getAllUsers);

module.exports = router;