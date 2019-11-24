const express = require('express');

const ActorController = require('../controllers/actor-controller');

const router = express.Router();

router.post('/actor', ActorController.createActor);
router.put('/actor/:id', ActorController.updateActor);
router.delete('/actor/:id', ActorController.deleteActor);
router.get('/actor/:id', ActorController.getActorById);
router.get('/actors', ActorController.getAllActors);

module.exports = router;