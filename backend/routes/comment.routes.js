const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.controllers');
const auth = require('../middlewares/auth.middleware');

//routes comments
router.post('/', auth ,commentCtrl.newComment); // New Comment
router.put('/:id', auth ,commentCtrl.editComment); // Edit Comment
router.delete('/:id', auth ,commentCtrl.deleteComment); // Delete Comment

module.exports = router;