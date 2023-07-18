import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Message = sequelize.define('Message', {
    Id_message: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    corps: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Joueur,
        key: 'Id_joueur'
      }
    },
    Id_topic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Topic,
        key: 'Id_topic'
      }
    }
  }, {
    tableName: 'message', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });