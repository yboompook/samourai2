import { Joueur } from '../models/joueurs.js'; // Importer le modèle Joueur défini avec Sequelize
import crypto from 'crypto';

// Fonction pour générer un sel aléatoire
const genererSel = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Fonction pour hacher et saler le mot de passe
const hacherEtSalerMotDePasse = async (motDePasse, sel) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha3-512');

    // Ajouter le sel au mot de passe avant de le hacher
    const motDePasseAvecSel = motDePasse + sel;

    hash.update(motDePasseAvecSel);
    const hashedMotDePasse = hash.digest('hex');

    resolve({ hashedMotDePasse, sel });
  });
};

// Fonction pour vérifier les informations de connexion
export const verifierInformationsConnexion = async (pseudo, motDePasse) => {
  try {
    // Rechercher le joueur dans la base de données en utilisant le pseudo
    const joueur = await Joueur.findOne({ where: { pseudo } });

    if (!joueur) {
      // Le joueur n'existe pas
      return { success: false, message: 'Informations de connexion invalides.' };
    }

    // Vérifier le mot de passe
    const { mdp, sel } = joueur;
    const { hashedMotDePasse } = await hacherEtSalerMotDePasse(motDePasse, sel);

    if (mdp !== hashedMotDePasse) {
      // Le mot de passe est incorrect
      return { success: false, message: 'Informations de connexion invalides.' };
    }

    // Les informations de connexion sont valides
    return { success: true, joueur };
  } catch (error) {
    throw new Error('Une erreur s\'est produite lors de la vérification des informations de connexion.');
  }
};

// Fonction pour traiter la soumission du formulaire d'inscription
export const soumettreFormulaireInscription = async (req, res) => {
  try {
    // Récupérer les données du formulaire
    const { pseudo, prenom, description, mdp } = req.body;

    // Générer un sel aléatoire
    const sel = genererSel();

    // Hacher et saler le mot de passe
    const { hashedMotDePasse } = await hacherEtSalerMotDePasse(mdp, sel);

    // Créer un nouveau joueur dans la base de données
    const nouveauJoueur = await Joueur.create({
      pseudo,
      prenom,
      description,
      mdp: hashedMotDePasse, // Stocker le mot de passe haché
      sel, // Stocker le sel utilisé
      isadmin: false,
      lvlforgeron: 1,
      forge: 1,
      cuisine: 1,
      mine: 1,
      camp: 1,
      fer: 10,
      bois: 10,
      gold: 120
    });

    // Répondre avec un message de succès
    res.status(200).json({ message: 'Le joueur a été enregistré avec succès.' });
  } catch (error) {
    // En cas d'erreur, répondre avec un message d'erreur
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement du joueur.', error: error.message });
  }
};