const router = require('express').Router();
const AIController = require('../controllers/aiController');
const AuthController = require('../controllers/authController')

router.post('/create', AuthController.checkToken, AIController.createAI);
router.post('/delete/:creator/:name', AuthController.checkToken, AIController.deleteAI);
router.post('/update/:creator/:name', AuthController.checkToken, AIController.updateAI);
router.post('/find/:creator/:name', AuthController.checkToken, AIController.findAI);
router.post('/findall/:creator', AuthController.checkToken, AIController.findCreatorAIs);
router.post('/findall', AuthController.checkToken, AIController.findAllAIs);

module.exports = router;