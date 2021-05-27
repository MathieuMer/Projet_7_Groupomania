//Imports
const Message = require('../models').Message;
const User = require('../models').User;
const jwtMiddleware = require('../middlewares/auth');

//Routes
//Créer un nouveau message
exports.newMessage = (req, res, next) => {
    // Authentification
    const headerAuth = req.headers['authorization'];
    const userId = jwtMiddleware.getUserId(headerAuth);
    // Création objet message
    const message = {
        UserId: userId,
        content: req.body.content,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
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
    // Authentification
    const headerAuth = req.headers['authorization'];
    const userId = jwtMiddleware.getUserId(headerAuth);
    //Récupérer les parametres dans l'URL
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    var order = req.query.order;
    // Faire le requêtes des tout les messages, classés par date de création DESC
    Message.findAll({
        order: [(order != null) ? order.split(':') : ['id', 'DESC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: User,
            attributes: ['id', 'lastname', 'firstname']
        }]
    })
    .then((messages) => {
        if (messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({"error": "Aucun message trouvé !"});
        };
    })
    .catch((err) => res.status(500).send({ message: "Erreur lors de la reqête" + err }));
};