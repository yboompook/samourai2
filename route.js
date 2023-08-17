import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import jwt from 'jsonwebtoken';
//import fs from 'fs';
import { soumettreFormulaireInscription, verifierInformationsConnexion } from './controllers/inscription.js';
import { Combatant } from './models/combatants.js';
import Joueur from './models/joueurs.js';
import Clan from './models/clans.js';
import Appartenir from './models/appartenir.js';
import Messageprive from './models/messagePrivée.js';
import { Sequelize } from 'sequelize'; 
import sequelize from './database.js';

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
  res.render('messagerie');
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

router.get('/api/joueurs', async (req, res) => {
  try {
    const joueurs = await Joueur.findAll({
      attributes: ['pseudo', 'Id_joueur', 'gold'], // Sélectionnez les attributs que vous souhaitez récupérer
    });

    res.json(joueurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des joueurs' });
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


// Route de mise à jour d'un combattant par son identifiant (ID)
router.put('/combatant/update/:id', async (req, res) => {
  const combatantId = req.params.id;
  const updatedData = req.body;

  try {
    // Vérifier si le combattant avec l'ID donné existe dans la base de données
    const existingCombatant = await Combatant.findOne({ where: { Id_combatant: combatantId } });
    if (!existingCombatant) {
      return res.status(404).json({ error: 'Combattant non trouvé.' });
    }

    // Mettre à jour les attributs du combattant avec les données fournies
    existingCombatant.vitalite = updatedData.vitalite || existingCombatant.vitalite;
    existingCombatant.endurance = updatedData.endurance || existingCombatant.endurance;
    existingCombatant.puissance = updatedData.puissance || existingCombatant.puissance;
    existingCombatant.dexterite = updatedData.dexterite || existingCombatant.dexterite;
    existingCombatant.fatigue = updatedData.fatigue || existingCombatant.fatigue;
    existingCombatant.niveau = updatedData.niveau || existingCombatant.niveau;

    // Enregistrez les modifications dans la base de données
    const updatedCombatant = await existingCombatant.save();

    res.json({ message: 'Combattant mis à jour avec succès.', combatant: updatedCombatant });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du combattant:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du combattant.' });
  }
});


// Route pour récupérer les données du clan du joueur
router.get('/api/clan', authMiddleware, async (req, res) => {
  const id_joueur = req.user.id_joueur;
  console.log("ID du joueur : " + id_joueur);

  try {
    // Récupérer les données du joueur en utilisant l'ID du joueur
    const joueur = await Joueur.findOne({ where: { Id_joueur: id_joueur } });

    if (!joueur) {
      // Le joueur n'existe pas, renvoyer une erreur 404
      return res.status(404).json({ message: 'Joueur introuvable.' });
    }

    // Récupérer les données du clan du joueur en utilisant les associations définies
    const clanDuJoueur = await joueur.getClans();

    if (!clanDuJoueur || clanDuJoueur.length === 0) {
      // Le joueur n'appartient à aucun clan, renvoyer une réponse indiquant cela
      return res.status(200).json({ message: 'Le joueur n\'appartient à aucun clan.' });
    }

    // Compter le nombre de joueurs dans le clan
    const nbMembres = await Appartenir.count({ where: { Id_clan: clanDuJoueur[0].Id_clan } });

    // Envoyer les données du clan du joueur dans la réponse avec le nombre de membres
    return res.status(200).json({ success: true, clan: { ...clanDuJoueur[0].dataValues, nbMembres } });
  } catch (error) {
    // En cas d'erreur, renvoyer une erreur 500 avec le message d'erreur
    console.error('Erreur lors de la récupération des données du clan:', error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des données du clan.', error: error.message });
  }
});


// Route pour rejoindre un clan
router.post('/api/clan/:clanId/rejoindre', authMiddleware, async (req, res) => {
  const id_joueur = req.user.id_joueur;
  const clanId = req.params.clanId;

  try {
    // Vérifier si le joueur existe dans la base de données
    const joueur = await Joueur.findOne({ where: { id_joueur } });

    if (!joueur) {
      return res.status(404).json({ message: "Joueur introuvable." });
    }

    // Vérifier si le joueur a déjà un clan
    const joueurHasClan = await Appartenir.findOne({ where: { Id_joueur: id_joueur } });

    if (joueurHasClan) {
      return res.status(400).json({ message: "Le joueur appartient déjà à un clan." });
    }

    // Vérifier si le clan existe dans la base de données
    const clan = await Clan.findOne({ where: { Id_clan: clanId } });

    if (!clan) {
      return res.status(404).json({ message: "Clan introuvable." });
    }

    // Rejoindre le clan en créant une nouvelle entrée dans la table appartenir
    await Appartenir.create({
      Id_joueur: id_joueur,
      Id_clan: clanId,
      iscreateur: false,
      isadmin: false,
    });

    // Renvoyer les données du clan en tant que réponse JSON
    res.json({ clan });
  } catch (error) {
    console.error('Erreur lors du rejoindre du clan:', error);
    res.status(500).json({ message: "Une erreur est survenue lors du rejoindre du clan." });
  }
});



// Route pour créer un clan
router.post('/api/clan/create', authMiddleware, async (req, res) => {
  const id_joueur = req.user.id_joueur;
  const { nom, description } = req.body;

  try {
    // Vérifier si le joueur existe dans la base de données
    const joueur = await Joueur.findOne({ where: { id_joueur: req.user.id_joueur } });

    if (!joueur) {
      return res.status(404).json({ message: "Joueur introuvable." });
    }

    // Vérifier si le joueur a déjà un clan
    const joueurHasClan = await Appartenir.findOne({ where: { Id_joueur: req.user.id_joueur } });

    if (joueurHasClan) {
      return res.status(400).json({ message: "Le joueur appartient déjà à un clan." });
    }

    // Vérifier si le nom du clan est déjà utilisé par un autre clan
    const existingClan = await Clan.findOne({ where: { nom } });

    if (existingClan) {
      return res.status(400).json({ message: "Le nom du clan est déjà utilisé par un autre clan." });
    }

    // Créer un nouveau clan pour le joueur
    const clan = await Clan.create({ nom, description });

    // Ajouter le joueur comme membre fondateur et admin du clan
    const appartenir = await Appartenir.create({
      Id_joueur: req.user.id_joueur,
      Id_clan: clan.Id_clan,
      iscreateur: true,
      isadmin: true,
    });

  // Renvoyer une réponse indiquant que le clan a été créé avec succès
  res.status(200).json({ message: "Le clan a été créé avec succès." });
  } catch (error) {
    console.error('Erreur lors de la création du clan:', error);
    res.status(500).json({ message: "Une erreur est survenue lors de la création du clan." });
  }
});

// Route to get all clans sorted by the number of players in each clan
router.get('/api/clans/sorted', async (req, res) => {
  try {
    // Retrieve all clans along with their associated player count using Sequelize aggregation
    const clansWithPlayerCount = await Clan.findAll({
      attributes: ['Id_clan', 'nom', 'description', [Sequelize.fn('COUNT', Sequelize.col('Joueurs.Id_joueur')), 'nbMembres']],
      include: [{
        model: Joueur,
        attributes: [],
      }],
      group: ['Clan.Id_clan'], // Corrected attribute name to 'Clan.Id_clan'
      order: [[Sequelize.literal('nbMembres'), 'DESC']],
    });

    // Send the sorted clans data in the response
    res.json({ success: true, clans: clansWithPlayerCount });
  } catch (error) {
    console.error('Error while fetching clans:', error);
    res.status(500).json({ message: 'An error occurred while fetching clans.', error: error.message });
  }
});

router.get('/api/clan/:clanId/joueurs', authMiddleware, async (req, res) => {
  const clanId = req.params.clanId;

  try {
    // Vérifier si le clan existe dans la base de données
    const clan = await Clan.findOne({ where: { Id_clan: clanId } });

    if (!clan) {
      return res.status(404).json({ message: "Clan introuvable." });
    }

    // Récupérer les joueurs du clan avec pagination (page 1 par défaut)
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const joueurs = await Joueur.findAll({
      where: { Id_clan: clanId },
      limit,
      offset
    });

    // Renvoyer les données des joueurs du clan en tant que réponse JSON
    res.json({ joueurs });
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs du clan:', error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des joueurs du clan." });
  }
});

router.get('/api/clan/:clanId/details', authMiddleware, async (req, res) => {
  const clanId = req.params.clanId;

  try {
    const clanDetails = await Clan.findOne({
      where: { Id_clan: clanId },
      include: [
        {
          model: Appartenir,
          include: [
            {
              model: Joueur,
              attributes: ['Id_joueur', 'pseudo'],
            },
          ],
        },
      ],
    });

    const clanPlayers = clanDetails.Appartenirs;
    const playerDetailsPromises = clanPlayers.map(async (player) => {
      const combatantCount = await Combatant.count({ where: { Id_joueur: player.Joueur.Id_joueur } });
      return {
        ...player.toJSON(),
        Joueur: {
          ...player.Joueur.toJSON(),
          combatantCount,
        },
      };
    });

    const playerDetails = await Promise.all(playerDetailsPromises);

    res.json({
      clan: {
        ...clanDetails.toJSON(),
        Appartenirs: playerDetails,
      },
    });

    /*
  try {
    const clanDetails = await Clan.findOne({
      where: { Id_clan: clanId },
      include: [
        {
          model: Appartenir,
          include: [
            {
              model: Joueur,
              attributes: ['pseudo'],
            },
          ],
        },
      ],
    });

    if (!clanDetails) {
      return res.status(404).json({ message: "Clan introuvable." });
    }

    const clanPlayers = clanDetails.Appartenirs;
    const playerDetailsPromises = clanPlayers.map(async (player) => {
      const combatantCount = await Combatant.count({ where: { Id_joueur: player.Joueur.Id_joueur } });
      return {
        ...player.toJSON(),
        Joueur: {
          ...player.Joueur.toJSON(),
          combatantCount,
        },
      };
    });

    const playerDetails = await Promise.all(playerDetailsPromises);

    res.json({
      clan: {
        ...clanDetails.toJSON(),
        Appartenirs: playerDetails,
      },
    });*/
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du clan:', error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des détails du clan." });
  }
});


// Route pour quitter le clan par le joueur
router.post('/api/clan/:clanId/quit', authMiddleware, async (req, res) => {
  const playerId = req.user.id_joueur; // Supposons que le joueur est authentifié et les données du joueur sont dans req.user
  const clanId = req.params.clanId;

  try {
    // Vérifier si le joueur est membre du clan
    const existingMembership = await Appartenir.findOne({
      where: {
        Id_joueur: playerId,
        Id_clan: clanId,
      },
    });

    if (!existingMembership) {
      return res.status(400).json({ message: "Le joueur n'est pas membre de ce clan." });
    }

    // Supprimer l'association entre le joueur et le clan
    await existingMembership.destroy();

    res.json({ message: 'Le joueur a quitté le clan avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la sortie du clan:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la sortie du clan.', error: error.message });
  }
});

// Route pour dissoudre le clan (supprimer le clan et tous ses membres)
router.delete('/api/clan/:clanId/dissolve', authMiddleware, async (req, res) => {
  const clanId = req.params.clanId;

  try {
    // Supprimer tous les membres du clan (associations Appartenir)
    await Appartenir.destroy({
      where: {
        Id_clan: clanId,
      },
    });

    // Supprimer le clan lui-même
    await Clan.destroy({
      where: {
        Id_clan: clanId,
      },
    });

    res.json({ message: 'Le clan a été dissous avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la dissolution du clan:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la dissolution du clan.', error: error.message });
  }
});






router.post('/api/messageprive', authMiddleware, async (req, res) => {
  try {
    const id_joueur = req.user.id_joueur;
    const { titre, corps, jour, Id_joueur_1 } = req.body;

    // Créer le message privé en utilisant les données fournies
    const messagePrive = await Messageprive.create({
      titre,
      corps,
      jour,
      Id_joueur,
      Id_joueur_1
    });

    res.status(201).json({ message: "Message privé créé avec succès.", messagePrive });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la création du message privé." });
  }
});


router.get('/api/messageprive/sent', authMiddleware, async (req, res) => {
  try {
    const id_joueur = req.user.id_joueur;
    console.log(id_joueur);

    // Récupérer les messages privés envoyés par le joueur
    const sentMessages = await Messageprive.findAll({
      where: { Id_joueur: id_joueur }
    });

    res.status(200).json({ sentMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des messages privés envoyés." });
  }
});


router.get('/api/messageprive/received', authMiddleware, async (req, res) => {
  try {
    const id_joueur = req.user.id_joueur;

    // Récupérer les messages privés reçus par le joueur
    const receivedMessages = await Messageprive.findAll({
      where: { Id_joueur_1: id_joueur }
    });

    res.status(200).json({ receivedMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des messages privés reçus." });
  }
});


router.post('/api/messageprive/create', authMiddleware, async (req, res) => {
  try {
    const id_joueur = req.user.id_joueur;
    // Extract data from the request body
    const { id_joueur_1, titre, corps } = req.body;

    console.log(id_joueur);
    console.log(id_joueur_1);
    console.log(titre);
    console.log(corps);

    // Create the new message
    const newMessage = await Messageprive.create({
      titre: titre,
      corps: corps,
      //jour: new Date().getTime(), // Or your desired value
      Id_joueur: id_joueur,
      Id_joueur_1: id_joueur_1,
    });

    res.status(201).json({ message: 'Message created successfully', newMessage });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'An error occurred while creating the message' });
  }
});

export default router;