import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Clan = sequelize.define('Clan', {
    Id_clan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'clan', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });