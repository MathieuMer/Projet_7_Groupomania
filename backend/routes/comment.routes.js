const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.controllers');
const auth = require('../middlewares/auth.middleware');

//routes comments
router.post('/', auth ,commentCtrl.newComment); // New Comment
router.put('/', auth ,commentCtrl.editComment); // Edit Comment
router.delete('/', auth ,commentCtrl.deleteComment); // Delete Comment

module.exports = router;