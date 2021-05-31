//Imports
const bcrypt = require('bcryptjs');
const crypto = require('crypto-js');
const User = require('../models').User;
const Message = require('../models').Message;
const jwt = require('jsonwebtoken');

//REGEX Models
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/

//Controllers
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
    console.log(password);
    // Chercher l'utilisateur 
    User.findOne({ where: { email: email } })
        .then((Userfound) => {
            bcrypt.compare(password, Userfound.password)
                .then(valid => {
                    console.log(valid);
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !!!!' });
                    } 
                    res.status(200).json({
                            userId: Userfound.id,
                            token: jwt.sign({ userId: Userfound.id, isAdmin: Userfound.isAdmin }, process.env.TOKEN_KEY, { expiresIn: '24h' })
                    });
                })
                .catch((err) => res.status(400).send({ message: 'Mot de passe incorrect !' }));
        })
        .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
};

exports.getUserProfile = (req, res, next) => {
    // Récupérer les infos dans la BDD
    User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'birthdate', 'bio', 'avatar', 'job'],
        where: { id: res.locals.userId }
    })
    .then((user) => { res.status(200).json({ user }) })
    .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
};

exports.updateUserProfile = (req, res, next) => {
    // Récuperation des données
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthdate = req.body.birthdate;
    const bio = req.body.bio;
    const avatar = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const job = req.body.job;
    console.log('Chemin de image : '+ avatar);

    User.findOne({
        attributes: ['id', 'email', 'firstname', 'lastname', 'birthdate', 'bio', 'avatar', 'job', 'avatar'],
        where: { id: res.locals.userId }
    })
    .then((User) => {
        User.update({
            firstname: (firstname ? firstname : User.firstname),
            lastname: (lastname ? lastname : User.lastname),
            birthdate: (birthdate ? birthdate : User.birthdate),
            avatar: (avatar ? avatar : User.avatar),
            job: (job ? job : User.job),
            bio: (bio ? bio : User.bio),
            avatar: (avatar ? avatar : User.avatar)
        })
        .then((User) => { res.status(201).json({ User }) })
        .catch((err) => res.status(500).send({ message: "Erreur lors de la mise à jour de profil" }));
    })
    .catch((err) => res.status(400).send({ message: "Utilisateur non trouvé !" }));
}

exports.deleteUserProfile = (req, res, next) => {
    const password = req.body.password;
    // Chercher l'utilisateur 
    User.findOne({ where: { id: res.locals.userId } })
        .then((Userfound) => {
            bcrypt.compare(password, Userfound.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !!!!' });
                    }
                    User.destroy({ where: { id: Userfound.id } })
                        .then(() => res.status(201).json({ message: 'Utilisateur supprimé' }))
                        .catch(err => res.status(500).json({ err }));
                })
                .catch((err) => res.status(400).send({ message: 'Mot de passe incorrect !' }));
        })
        .catch((err) => res.status(500).send({ message: "Utilisateur non trouvé !" }));
};