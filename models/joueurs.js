import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Joueur = sequelize.define('Joueur', {
  Id_joueur: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pseudo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  prenom: {
    type: DataTypes.STRING(50)
  },
  description: {
    type: DataTypes.TEXT
  },
  mdp: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  sel: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  lvlforgeron: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  forge: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  mine: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  camp: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  fer: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bois: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gold: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'joueur', // Nom de la table dans la base de données
  timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
});