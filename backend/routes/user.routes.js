const express = require('express');
const rateLimit = require("express-rate-limit");
const router = express.Router();
const passworValidator = require('../middlewares/passwordValidator.middleware');
const userCtrl = require('../controllers/user.controllers');
const multer = require('../middlewares/multer.middleware');
const auth = require('../middlewares/auth.middleware');


//rate-limiter spécifique sur le signup (5 requetes toutes les 30 minutes)
const signupLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 5,
    message:
    "Trop de tentatives d'inscription !"
});

//routes users
router.post('/signup', signupLimiter, passworValidator, userCtrl.signup); // Create account
router.post('/login', userCtrl.login); // Login
router.get('/me', auth, userCtrl.getUserProfile); // Voir son propre profil
router.get('/:id', auth, userCtrl.getUserProfileById); // Voir le profil d'un utilisateur
router.put('/me', auth, multer, userCtrl.updateUserProfile); // Mettre à jour son profil
router.delete('/me', auth, userCtrl.deleteUserProfile); // Supprimer son profil

module.exports = router;