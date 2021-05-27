const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controllers');
const passwordValidator = require("../middlewares/passwordValidator");

//routes users
router.post('/signup', userCtrl.signup); // Create account
router.post('/login', userCtrl.login); // Login
router.put('/login', userCtrl.update); // Update profil

module.exports = router;