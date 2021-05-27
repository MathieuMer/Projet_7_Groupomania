const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const User = require('./models').User;
const Message = require('./models').Message;

const userRoutes = require('./routes/user.routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Ajoute les en-têtes sur res
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//routes
app.use('/api/user', userRoutes);
//app.use('/api/post', postRoutes);
//app.use('/api/comment', commentRoutes);

/* User.create({
    email: "mathieu2@test.fr",
    password : "TestPassword"
}).then(user => {
    user.createMessage({
        content :"ojnviruvifuvir"
    }).then(() => console.log('Worked !'));
});
 */

module.exports = app;