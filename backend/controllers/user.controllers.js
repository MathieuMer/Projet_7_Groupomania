//Imports
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const User = require('../models').User;
const jwtMiddleware = require('../middlewares/auth')

//REGEX Models
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/

//Routes
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
        where: { email: email }
    })
        .then((userfound) => {
            if (!userfound) {
                // Si l'email n'est pas trouvé dans la BDD, alors hash le password et créer le User
                bcrypt.hash(password, 10, function (err, cryptedPassword) {
                    User.create({
                        email: email,
                        password: cryptedPassword
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
    User.findOne({ where: { email: email } })
        .then((Userfound) => {
            console.log(Userfound);
            bcrypt.compare(password, Userfound.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !!!!' });
                    }
                    res.status(200).json({
                        userId: Userfound.id,
                        token: jwtMiddleware.generateNewToken(Userfound.id, Userfound.isAdmin)
                    });
                })
                .catch((err) => res.status(400).send({ message: 'Mot de passe incorrect !' }));
        })
        .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
};

exports.getUserProfile = (req, res, next) => {
    // Récuperation de authorization dans les headers de la req et authentification
    const headerAuth = req.headers['authorization'];
    const userId = jwtMiddleware.getUserId(headerAuth);

    // Vérification supplémentaire
    if (userId < 0) {
        return res.status(400).json({ 'error': 'Mauvais Token' });
    }

    User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'birthdate', 'bio', 'avatar', 'job'],
        where: { id: userId }
    })
    .then((user) => { res.status(200).json({ user }) })
    .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
};

exports.updateUserProfile = (req, res, next) => {
    // Récuperation de authorization dans les headers de la req et authentification
    const headerAuth = req.headers['authorization'];
    userId = jwtMiddleware.getUserId(headerAuth);

    // Vérification supplémentaire
    if (userId < 0) {
        return res.status(400).json({ 'error': 'Mauvais Token' });
    }

    // Récuperation des données
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthdate = req.body.birthdate;
    const bio = req.body.bio;
    const avatar = req.body.avatar;
    const job = req.body.job;

    User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'birthdate', 'bio', 'avatar', 'job'],
        where: { id: userId }
    })
    .then((User) => {
        User.update({
            firstname: (firstname ? firstname : User.firstname),
            lastname: (lastname ? lastname : User.lastname),
            birthdate: (birthdate ? birthdate : User.birthdate),
            avatar: (avatar ? avatar : User.avatar),
            job: (job ? job : User.job),
            bio: (bio ? bio : User.bio)
        })
        .then((User) => { res.status(200).json({ User }) })
        .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
    })
    .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
};