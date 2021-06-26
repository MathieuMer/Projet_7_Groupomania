# Mathieu Mercier - Projet 7 - Groupomania
```
Parcours développeur web - OpenClassroom
```

# Instructions pour faire tourner la MVP Groupomania en local :

## prérequis

* Node.js - MySQL - Vue.js

## Base de donnée et backend :

* Ouvrir un terminal dans le dossier de mySQL
* Se connecter à mySQL : `mysql -h localhost -u root -p`
* Une fois logué, créer la base : `CREATE DATABASE groupomania CHARACTER SET 'utf8';`
* Puis utiliser cette base : `USE groupomania`
* Modifier username et password dans le fichier config.json dans le dossier backend/config : `username: root / password: votre mot de passe`
* Toujours dans le dossier backend/config, créer un fichier .env et le remplir avec les valeurs suivantes : 
```
PORT=3000
TOKEN_KEY=LA_CLE_QUE_VOUS_VOULEZ
TOKEN_VALID='24h'
```
* Ouvrir un terminal dans le dossier backend du projet
* Installer les dépendances : `npm install`
* Migrer les tables dans la base de sonnées : `sequelize db:migrate`
* Lancer le serveur : `nodemon server`

## frontend (VueJS)

* Ouvrir un terminal dans le dossier frontend du projet
* Installer les dépendances : `npm install`
* Lancer l'application' : `npm run serve`
* L'application est maintenant disponible : `http://localhost:8080/`

* Pour attribuer les droits d'admin, il faut modifier manuellement la BDD et passer le champs isAdmin de l'utilisateur souhaité à 1