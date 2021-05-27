const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
const User = require('../models').User;

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/

exports.signup = (req, res, next) => {
    // Récuperation de l'email et du password
    const email = req.body.email;
    const password = req.body.password;

    // Verifier si la requête n'est pas nulle
    if (email == null || password == null) {
        return res.status(400).send({ message: "Les champs Email et Password ne doivent pas être vides" });
    };

    // Vérification REGEX pour Email et Password
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).send({ message: "Format de l'email incorrect" });
    };

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).send({ message: "Format du mot de passe incorrect" });
    };

    // Vérifier si l'email existe déjà
    User.findOne({
        attributes: ["email"],
        where: {email: email}
    })
    .then((userfound) => {
        if (!userfound) {
            // Si l'email n'est pas trouvé dans la BDD, alors hash le password et créer le User
            bcrypt.hash(password, 10, function(err, cryptedPassword) {
                User.create({
                    email: email,
                    password : cryptedPassword
                })
                .then(() => res.status(201).send({ message: "Utilisateur créé !" }))
                .catch((err) => res.status(500).send({ message: "Erreur lors de la création de l'utilisateur :" + err }));
            });
        } else {
            // Si email trouvé dans la BDD
            return res.status(409).send({ message: "L'utilisateur existe déjà !" });
        };
    })
    .catch((err) => res.status(500).send({ message: "Impossible de vérifier l'utilisateur :" + err }));
};

exports.login = (req, res, next) => {
    // Récuperation de l'email et du password
    const email = req.body.email;
    const password = req.body.password;

    // Chercher l'utilisateur 
    User.findOne({ where: {email: email} })
    .then((Userfound) => {
        console.log(Userfound);
        bcrypt.compare(password, Userfound.password)
        .then(valid => {
            if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect !!!!' });
            }
            res.status(200).json({
                userId: Userfound.id,
                token: jwt.sign( { userId: Userfound.id }, process.env.TOKEN_KEY, { expiresIn: '24h' } )
            });
        })
        .catch((err) => res.status(400).send({ message: 'Mot de passe incorrect !' }));
    })
    .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
};

exports.update = (req, res, next) => {
    // Récuperation des données
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthdate = req.body.birthdate;
    const bio = req.body.bio;
    const avatar = req.body.avatar;
    const job = req.body.job;

    


}