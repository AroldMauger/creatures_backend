const express = require('express');
require("dotenv").config();
const cors = require("cors");
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();


// Connexion à la base de données MongoDB //
mongoose.connect(`mongodb+srv://AroldMauger:I_Love_Mongo@cluster0.3vp9fh7.mongodb.net`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// --- Configuration d'Express --- //
// Toutes les routes appliqueront les règles de CORS//
  app.use(cors());  
// Configuration du middleware pour analyser les requêtes au format JSON //
  app.use(bodyParser.json());
  app.use(express.json())

// Configuration CORS //
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://creatures-fantastiques-24296.web.app');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


// Routes pour les livres //
  app.use("/api/books", bookRoutes);
// Routes pour l'authentification des utilisateurs //
  app.use("/api/auth", userRoutes);
// Configuration du middleware pour servir les images statiques du répertoire 'images' //
  app.use('/images', express.static(path.join(__dirname, 'images')));


  if (require.main === module) {
    app.listen(4000, () => {
      console.log('Le serveur est en écoute sur le port 4000 !');
    });
  }

