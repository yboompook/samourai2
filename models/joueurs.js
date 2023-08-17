import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
//import Appartenir from './appartenir.js';
//import Clan from './clans.js';

export default class Joueur extends Model {
  // Your model definition here
}

Joueur.init(
  {
    // Define the model attributes based on your SQL table schema
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pseudo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    prenom: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.TEXT,
    },
    mdp: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sel: { // Make sure this property is defined in the model
      type: DataTypes.STRING(16), // or DataTypes.STRING, depending on the length you want for the "sel" value
      allowNull: false,
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    lvlforgeron: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    forge: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    mine: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    camp: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    fer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bois: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Joueur',
    timestamps: false,
    tableName: 'joueur',
  }
);

// Définir l'association avec le modèle "Appartenir"
//Joueur.belongsToMany(Clan, { through: Appartenir, foreignKey: 'Id_joueur', otherKey: 'Id_clan' });

//export default Joueur;