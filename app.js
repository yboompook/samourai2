import express from 'express';
//import exphbs from 'express-handlebars';
import session from 'express-session';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import route from './route.js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import serveStatic from 'serve-static';
import ejs from 'ejs';
import sequelize from './database.js';

//import { soumettreFormulaireInscription } from './controllers/inscription.js';


dotenv.config();

// Vérification de la connexion à la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');

    // Définir ici les routes de votre application Express

  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
})();
// Configuration d'Express
//const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configurer Handlebars comme moteur de template
//app.engine('handlebars', exphbs.create({ /* options du moteur de template */ }));
//app.set('view engine', 'handlebars');

// Configurer le middleware de session
app.use(
  session({
    secret: 'samourai', // Clé secrète pour signer les cookies de session
    resave: false, // Ne pas sauvegarder la session si elle n'est pas modifiée
    saveUninitialized: false // Ne pas sauvegarder les sessions non initialisées
  })
);

// Définir EJS comme moteur de modèle par défaut
app.set('view engine', 'ejs');

// Résoudre le chemin du fichier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = join(__dirname, 'public');
// Définir le dossier de fichiers statiques
const controllersDir = join(__dirname, 'controllers');
const cssDir = join(__dirname, 'css');
const imageDir = join(__dirname, 'images');
app.use('/controllers', serveStatic(controllersDir));
app.use('/css', serveStatic(cssDir));
app.use('/images', serveStatic(imageDir));

const port = 3000;
app.use('/', route);
// Démarrage du serveur
app.listen(port, () => {
  console.log(`Le serveur est à l'écoute sur le port ${port}. et mdp ${process.env.DB_PASSWORD}`);
});