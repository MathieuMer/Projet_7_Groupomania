const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const messageRoutes = require('./routes/message.routes');
const commentRoutes = require('./routes/comment.routes');

// Ajoute les en-têtes sur res
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public/images', express.static(path.join(__dirname, '/public/images')));

//routes
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;