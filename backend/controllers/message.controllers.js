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
        .then((message) => res.status(201).send({ message: "Message créé ! " }))
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
            attributes: ['id', 'lastname', 'firstname', 'avatar', 'job']
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
                // Ajoute l'userId récupéré du token, pour permettre au front de connaitre l'userId de l'utilisateur
                messages.push( {userId : res.locals.userId});
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "Aucun message trouvé !" });
            };
        })
        .catch((err) => res.status(500).send({ message: "Erreur lors de la reqête" + err }));
};

exports.deleteMessage = (req, res, next) => {
    // Récupération de l'id du message a supprimer
    const messageId = req.query.id;
    // Chercher la ligne du message 
    Message.findOne({ where: { id: messageId } })
        // Vérifier si l'userId correspond, ou si l'user est admin
        .then((message) => {
            if (res.locals.userId !== message.userId && res.locals.isAdmin !== 1) { res.status(400).json("Vous n'avez pas les droits pour supprimer ce message") };
            // Si OK => Vérifier si le message contient une image
            const imageurl = message.imageurl;
            if (imageurl !== null) {
                // Si oui => Supprimer l'image et supprimer le message de la BDD
                const filename = imageurl.split('/images')[1];
                fs.unlink(`./public/images/${filename}`, (err) => {
                    if (err) throw err;
                    Message.destroy({ where: { id: messageId } })
                        .then(() => res.status(201).json({ message: 'Message supprimé' }))
                        .catch(err => res.status(500).json({ err }));
                })
            } else {
                // Si non => Supprimer uniquement le message de la BDD
                Message.destroy({ where: { id: messageId } })
                    .then(() => res.status(201).json({ message: 'Message supprimé' }))
                    .catch(err => res.status(500).json({ err }));
            }
        })
        .catch((err) => res.status(500).send({ err }));
};

exports.editMessage = (req, res, next) => {
    // Récuperation des données
    const messageId = req.body.messageId;
    const content = req.body.content;
    const imageurl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    Message.findOne({ where: { id: messageId } })
        .then((message) => {
            const oldImageurl = message.imageurl;
            // Check si UserId correspond bien à l'auteur du message
            if (res.locals.userId !== message.userId) { res.status(400).json("Vous n'avez pas les droits pour modifier ce message") };
            // Suppression de l'ancienne image si elle existe ET si il y en a une nouvelle
            if (imageurl !== null && oldImageurl !== null) {
                const filename = oldImageurl.split('/images/')[1];
                fs.unlink(`./public/images/${filename}`, (err) => {
                    if (err) throw err;
                });
            };
            // Update Message
            Message.update({
                content: (content ? content : message.content),
                imageurl: (imageurl ? imageurl : oldImageurl)
            },
            {
                where: { id: messageId }
            })
                .then((message) => { res.status(201).json({ message: "Update du message réussi !" }) })
                .catch((err) => res.status(500).send({ message: "Erreur lors de la mise à jour du message" }));

        })
        .catch((err) => res.status(500).send({ err }));
};

exports.signalMessage = (req, res, next) => {

};



