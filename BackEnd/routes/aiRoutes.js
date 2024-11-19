const router = require('express').Router();
const AIController = require('../controllers/aiController');

router.post('/create', AIController.createAI);
router.post('/delete/:creator/:name', AIController.deleteAI);
router.post('/update/:creator/:name', AIController.updateAI);
router.post('/find/:creator/:name', AIController.findAI);
router.post('/findall/:creator', AIController.findCreatorAIs);
router.post('/findall', AIController.findAllAIs);

module.exports = router;