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
router.post('/signal/:id', auth, Multer,messageCtrl.signalMessage); // Signaler un Message

module.exports = router;