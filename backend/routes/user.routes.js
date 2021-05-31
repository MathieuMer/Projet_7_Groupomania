const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
const multer = require('../middlewares/multer.middleware');
const auth = require('../middlewares/auth.middleware');

//routes users
router.post('/signup', userCtrl.signup); // Create account
router.post('/login', userCtrl.login); // Login
router.get('/me', auth, userCtrl.getUserProfile); // Voir son propre profil
router.put('/me', auth, multer, userCtrl.updateUserProfile); // Mettre à jour son profil
router.delete('/me', auth, userCtrl.deleteUserProfile); // Supprimer son profil

module.exports = router;