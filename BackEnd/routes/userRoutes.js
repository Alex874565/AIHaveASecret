const router = require('express').Router();
const UserController = require('../controllers/userController');

router.post('/create', UserController.createUser);
router.post('/delete/:name', UserController.deleteUser);
router.post('/update/:name', UserController.updateUser);
router.post('/find/:name', UserController.findUser);

module.exports = router;