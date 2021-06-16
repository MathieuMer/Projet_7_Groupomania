const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message.controllers');
const Multer = require('../middlewares/multer.middleware');
const auth = require('../middlewares/auth.middleware');

//routes messages
router.post('/', auth, Multer,messageCtrl.newMessage); // New Message
router.get('/', auth, messageCtrl.getAllMessage); // Recevoir tout les messages
router.delete('/', auth, messageCtrl.deleteMessage); // Supprimer un message
router.put('/', auth, Multer, messageCtrl.editMessage); // Modifier un message
router.put('/signal/', auth ,messageCtrl.signalMessage); // Signaler un Message
router.get('/signal/', auth, messageCtrl.getAllSignaled); // Pour les admins : Liste de tout les messages signalés
router.put('/deletesignal/', auth ,messageCtrl.deleteSignalMessage); // Enlever le signalement d'un Message

module.exports = router;