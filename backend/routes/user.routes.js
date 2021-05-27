const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');

//routes users
router.post('/signup', userCtrl.signup); // Create account
router.post('/login', userCtrl.login); // Login
router.get('/me', userCtrl.getUserProfile); // Voir son profil
router.put('/me', userCtrl.updateUserProfile); // Mettre à jour son profil

module.exports = router;