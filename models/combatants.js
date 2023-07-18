import { DataTypes } from 'sequelize';
import sequelize from '../database.js';
import { Joueur } from './joueurs.js';

export const Combatant = sequelize.define('Combatant', {
    Id_combatant: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    vitalite: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    endurance: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    puissance: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    dexterite: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    fatigue: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    niveau: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Joueur,
        key: 'Id_joueur'
      }
    }
  }, {
    tableName: 'combatant', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });