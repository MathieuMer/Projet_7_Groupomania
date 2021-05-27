const jwt = require('jsonwebtoken');

//Fonctions exportées
module.exports = {
    //Fonction signer un token
    generateNewToken: function(user, isAdmin) {
        return jwt.sign({ userId: user, isAdmin: isAdmin }, process.env.TOKEN_KEY, { expiresIn: '24h' })
    },
    //Fonction authentifier l'utilisateur
    getUserId: function(authorization) {
        console.log(authorization);
        let userId = -1;
        const token = authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decodedToken);
        if (decodedToken != null) { userId = decodedToken.userId };
        return userId;
    },
    //Fonction récupérer les permissions d'administrateur
    getUserPermission: function(authorization) {
        console.log(authorization);
        let isAdmin = -1;
        const token = authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decodedToken);
        if (decodedToken != null) { isAdmin = decodedToken.isAdmin }; 
        return isAdmin;
    }
};