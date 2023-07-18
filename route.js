import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import jwt from 'jsonwebtoken';
//import fs from 'fs';
import { soumettreFormulaireInscription, verifierInformationsConnexion } from './controllers/inscription.js';
import { Joueur } from './models/joueurs.js';
import { Combatant } from './models/combatants.js';

const router = express.Router();
const secretKey = 'samourai';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get('/inscription', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'formulaire_inscription.html');
  res.sendFile(filePath);
});

router.post('/inscription', soumettreFormulaireInscription); 

// Route principale "/"
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'index.html');
  res.sendFile(filePath);
});

// Route "/connexion"
router.get('/connexion', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'connexion.html');
  res.sendFile(filePath);
});
// Route de connexion
router.post('/connexion', async (req, res) => {
  const { pseudo, mdp } = req.body;
  
  try {

    // Vérifier les informations de connexion
    const { success, joueur, message } = await verifierInformationsConnexion(pseudo, mdp);

    if (!success) {
      // Les informations de connexion sont invalides
      return res.status(401).json({ message });
    }

    // Les informations de connexion sont valides, générer un jeton
    const token = jwt.sign({
      pseudo: joueur.pseudo,
      id_joueur: joueur.Id_joueur,
    }, secretKey, { expiresIn: '1h' });


    // Redirigez vers la route "/profil" avec le jeton inclus dans les paramètres de requête
    
    //res.status(200).json({ token });
    //res.redirect(`/profil?token=${token}`);

    req.session.token = token;
    req.session.user = pseudo;
    res.redirect('/home');

  } catch (error) {
    console.log('Erreur lors de la vérification de la connexion :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la vérification de la connexion' });
  }
});

// Middleware d'authentification
function authMiddleware(req, res, next) {
  //const token = req.headers.authorization;
  const token = req.session.token;
  //const token = req.query.token;
  
  if (!token) {
    return res.redirect('/connexion');
  }
  // Extraire le token en supprimant le préfixe "Bearer "
  const tokenSansPrefixe = token.replace('Bearer ', '');

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.redirect('/connexion');
    }
    
    // Les informations du jeton sont valides
    req.user = decoded;
    next();
  });
}
// Route "/home"
router.get('/home', authMiddleware, (req, res) => {
  res.render('home'); // Rend le fichier home.ejs
});
// Route "/combatant"
router.get('/combatant', authMiddleware, (req, res) => {
  res.render('combatant');
});
// Route "/profil"
router.get('/profil', authMiddleware, (req, res) => {
  res.render('profil');
});
// Route "/clan"
router.get('/clan', authMiddleware, (req, res) => {
  res.render('clan');
});
// Route "/messagerie"
router.get('/message', authMiddleware, (req, res) => {
  res.render('message');
});
// Route "/admin"
router.get('/admin', authMiddleware, (req, res) => {
  res.render('admin');
});
router.get('/api/joueur', authMiddleware, async (req, res) => {
  const pseudo = req.user.pseudo
  console.log("pseudo : " + pseudo)

  try {
    // Chercher le joueur dans la base de données en utilisant le pseudo
    //const joueur = await findOneByPseudo({ where: { pseudo } });
    const joueur = await Joueur.findOne({ where: { pseudo: pseudo } });

    if (!joueur) {
      return res.status(404).json({ message: "Joueur introuvable." });
    }

    // Renvoyer les données du joueur en tant que réponse JSON
    res.json({ joueur });
  } catch (error) {
    console.error('Erreur lors de la récupération du joueur:', error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération du joueur." });
  }
});
router.get('/api/combatant', authMiddleware, async (req, res) => {
  const pseudo = req.user.pseudo
  const id_joueur = req.user.id_joueur
  console.log("pseudo : " + pseudo)

  try {
    // Chercher le joueur dans la base de données en utilisant le pseudo
    //const joueur = await findOneByPseudo({ where: { pseudo } });
    const combatant = await Combatant.findAll({ where: { Id_joueur: id_joueur } });

    if (!combatant) {
      return res.status(404).json({ message: "Joueur introuvable." });
    }

    // Renvoyer les données du joueur en tant que réponse JSON
    res.json({ combatant });
  } catch (error) {
    console.error('Erreur lors de la récupération du joueur:', error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération du joueur." });
  }
});

router.post('/combatant/add', authMiddleware, async (req, res) => {
  // Récupérer les données du combattant depuis la requête
  const { nom, vitalite, endurance, puissance, dexterite } = req.body;

  try {
    // Valider les données (vous pouvez ajouter des validations supplémentaires selon vos besoins)
    if (!nom || !vitalite || !endurance || !puissance || !dexterite) {
      return res.status(400).json({ message: 'Veuillez fournir toutes les informations nécessaires.' });
    }

    // Créer le combattant dans la base de données
    const combatant = await Combatant.create({
      nom,
      vitalite,
      endurance,
      puissance,
      dexterite,
      fatigue: 0,
      niveau: 1,
      Id_joueur: req.user.id_joueur // Utilisez l'ID du joueur authentifié pour lier le combattant au joueur
    });

    // Répondre avec une confirmation de création
    res.status(201).json({ message: 'Le combattant a été créé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la création du combattant:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du combattant.' });
  }
});

export default router;