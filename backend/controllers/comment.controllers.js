//Imports
const Comment = require('../models').Comment;

//Controllers
// Envoyer un nouveau commentaire
exports.newComment = (req, res, next) => {
    // Création objet comment
    const comment = {
        UserId: res.locals.userId,
        content: req.body.content,
        MessageId: req.body.messageId
    }
    // Enregistrer dans la Database
    Comment.create(comment)
        .then((comment) => res.status(201).send({ message: "Commentaire créé !" }))
        .catch((err) => res.status(500).send({ message: "Erreur lors de la création du commentaire :" + err }));
};

// Editer commentaire
exports.editComment = (req, res, next) => {
    const UserId = res.locals.userId;
    const content = req.body.content;
    const commentid = req.body.commentId;
    Comment.findOne({ where: { id: commentid } })
        .then((comment) => {
            // Check si UserId correspond bien à l'auteur du commentaire
            if (res.locals.userId !== comment.userId) { res.status(400).json("Vous n'avez pas les droits pour modifier ce message") };
            // Update Message
            Comment.update({
                content: (content ? content : comment.content)
            },
                {
                    where: { id: comment.id }
                })
                .then(() => { res.status(201).json({ message: "Update du commentaire réussi !" }) })
                .catch((err) => res.status(500).send({ message: "Erreur lors de la mise à jour du commentaire " + err }));

        })
        .catch((err) => res.status(500).send({ err }));
};

// Supprimer commentaire
exports.deleteComment = (req, res, next) => {
    // Récupération de l'id du commentaire a supprimer
    const commentId = req.body.commentId;
    Comment.findOne({ where: { id: commentId } })
        // Vérifier si l'userId correspond, ou si l'user est admin
        .then((comment) => {
            if (res.locals.userId !== comment.userId && res.locals.isAdmin !== 1) { res.status(400).json("Vous n'avez pas les droits pour supprimer ce commentaire") };
            Comment.destroy({ where: { id: commentId } })
                .then(() => res.status(201).json({ message: 'Commentaire supprimé' }))
                .catch(err => res.status(500).json({ err }));
        })
        .catch((err) => res.status(500).send({ err }));
};