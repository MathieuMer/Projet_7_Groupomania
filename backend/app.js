const express = require('express');
const bodyParser = require('body-parser');
//const userRoutes = require('./routes/user');
//const saucesRoutes = require('./routes/sauces');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(path.join(__dirname, 'images')));

// Ajoute les en-têtes sur chaque requête
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes auth et sauces
//app.use('/api/auth', userRoutes);
//app.use('/api/sauces', saucesRoutes);

//test route
app.get("/", (req, res) => {
    res.json({ message: "Test message pour toutes les routes" });
});

module.exports = app;