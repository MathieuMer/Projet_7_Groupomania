const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.controllers');
const auth = require('../middlewares/auth.middleware');

//routes comments
router.post('/', auth ,commentCtrl.newComment); // New Comment
router.put('/', auth ,commentCtrl.editComment); // Edit Comment
router.delete('/', auth ,commentCtrl.deleteComment); // Delete Comment
router.put('/signal/', auth ,commentCtrl.signalComment); // Signal Comment
router.get('/signal/', auth, commentCtrl.getAllSignaled); // Pour les admins : Liste de tout les comments signalés
router.put('/deletesignal/', auth, commentCtrl.deleteSignalComment); // Annuler le signalement du comment
module.exports = router;