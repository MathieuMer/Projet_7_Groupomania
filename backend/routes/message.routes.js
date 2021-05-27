const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message.controllers');

//routes users
router.post('/', messageCtrl.newMessage); // New Message
router.get('/', messageCtrl.getAllMessage); // Recevoir tout les messages

module.exports = router;