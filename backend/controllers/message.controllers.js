//Imports
const Message = require('../models').Message;
const User = require('../models').User;
const Comment= require('../models').Comment;
const fs = require('fs');

//Controllers
//Créer un nouveau message
exports.newMessage = (req, res, next) => {
    // Création objet message
    const message = {
        UserId: res.locals.userId,
        content: req.body.content,
        imageurl: req.file ? `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}` : null
    }
    // Enregistrer dans la Database
    Message.create(message)
        .then((message) => res.status(201).send({ message }))
        .catch((err) => res.status(500).send({ message: "Erreur lors de la création du message :" + err }));
};
//GET tout les messages
/*
parametres d'url:
fields: id, content, imageurl, user (colonnes)
limit: 2
offset: 2
order: id:DESC
*/
exports.getAllMessage = (req, res, next) => {
    //Récupérer les parametres dans l'URL
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    var order = req.query.order;
    // Faire le requêtes des tout les messages, classés par date de création DESC
    Message.findAll({
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        attributes: ['id', 'content', 'imageurl', 'createdAt', 'updatedAt'],
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: User,
            attributes: ['id', 'lastname', 'firstname', 'avatar']
        }, {
            model: Comment,
            attributes: ['id', 'content', 'createdAt', 'updatedAt'],
            include: [{
                model: User,
                attributes: ['id', 'lastname', 'firstname', 'avatar']
            }]
        }]
    })
        .then((messages) => {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "Aucun message trouvé !" });
            };
        })
        .catch((err) => res.status(500).send({ message: "Erreur lors de la reqête" + err }));
};

exports.deleteMessage = (req, res, next) => {
    // Récupération de l'id du message a supprimer
    const messageId = req.body.id;
    // Chercher la ligne du message 
    Message.findOne({ where: { id: messageId } })
        // Vérifier si l'userId correspond, ou si l'user est admin
        .then((message) => {
            if (res.locals.userId !== message.userId && res.locals.isAdmin === false) { res.status(403).json("Vous n'avez pas les droits pour supprimer ce message") };
            // Si OK => Vérifier si le message contient une image
            const imageurl = message.imageurl;
            if (imageurl !== null) {
                // Si oui => Supprimer l'image et supprimer le message de la BDD
                const filename = imageurl.split('/images')[1];
                console.log(filename);
                fs.unlink(`./public/images/${filename}`, (err) => {
                    if (err) throw err;
                    Message.destroy({ where: { id: messageId } })
                        .then(() => res.status(205).json({ message: 'Message supprimé' }))
                        .catch(err => res.status(500).json({ err }));
                })
            } else {
                // Si non => Supprimer uniquement le message de la BDD
                Message.destroy({ where: { id: messageId } })
                    .then(() => res.status(205).json({ message: 'Message supprimé' }))
                    .catch(err => res.status(500).json({ err }));
            }
        })
        .catch((err) => res.status(500).send({ err }));
};

exports.editMessage = (req, res, next) => {
    // Récuperation des données
    const messageId = req.body.messageId;
    const content = req.body.content;
    const imageurl = req.file ? `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}` : null;
    const deleteOld = req.body.deleteOld;
    Message.findOne({ where: { id: messageId } })
        .then((message) => {
            let oldImageurl = message.imageurl;
            // Check si UserId correspond bien à l'auteur du message
            if (res.locals.userId !== message.userId) { res.status(403).json("Vous n'avez pas les droits pour modifier ce message") };
            // Suppression de l'ancienne image si elle existe, ET (si il y en a une nouvelle OU si deleteOld = true)
            if ((oldImageurl !== null) && (imageurl || deleteOld)) {
                const filename = oldImageurl.split('/images/')[1];
                fs.unlink(`./public/images/${filename}`, (err) => {
                    if (err) throw err;
                });
            };
            if (deleteOld) {
                oldImageurl = null
            }
            
            // Update Message
            Message.update({
                content: content,
                imageurl: (imageurl ? imageurl : oldImageurl)
            },
            {
                where: { id: messageId }
            })
                .then((message) => { res.status(200).json({ message: "Update du message réussi !" }) })
                .catch((err) => res.status(500).send({ message: "Erreur lors de la mise à jour du message" }));

        })
        .catch((err) => res.status(500).send({ err }));
};

exports.signalMessage = (req, res, next) => {
    const messageId = req.body.messageId;
    Message.update({
        isSignaled: true,
    },
    {
        where: { id: messageId }
    })
        .then((message) => { res.status(204).json({ message: "Le message a bien été signalé !" }) })
        .catch((err) => res.status(500).send({ message: "Erreur lors du signalement du message" }));
};

exports.getAllSignaled = (req, res, next) => {
    // Verif isAdmin
    if (!res.locals.isAdmin) { res.status(403).json("Vous n'avez pas les droits") };
    // Faire le requêtes des tout les messages, classés par date de création DESC
    Message.findAll({
        where: { isSignaled: true },
        include: [{
            model: User,
            attributes: ['lastname', 'firstname', 'avatar']
        }]
    })
        .then((messages) => {
                res.status(200).json(messages);
        })
        .catch((err) => res.status(500).send({ message: "Erreur lors de la requête" + err }));
};

exports.deleteSignalMessage = (req, res, next) => {
    // Verif isAdmin
    if (!res.locals.isAdmin) { res.status(403).json("Vous n'avez pas les droits") };
    const messageId = req.body.id;
    Message.update({
        isSignaled: false,
    },
    {
        where: { id: messageId }
    })
        .then((message) => { res.status(204).json({ message: "Signalement du message désactivé !" }) })
        .catch((err) => res.status(500).send({ message: err }));
};



