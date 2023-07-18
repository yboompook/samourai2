import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Messageprive = sequelize.define('Messageprive', {
    Id_messageprive: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titre: {
      type: DataTypes.STRING(100)
    },
    corps: {
      type: DataTypes.TEXT
    },
    jour: {
      type: DataTypes.INTEGER
    },
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Joueur,
        key: 'Id_joueur'
      }
    },
    Id_joueur_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Joueur,
        key: 'Id_joueur'
      }
    }
  }, {
    tableName: 'messageprive', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });