import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Marche = sequelize.define('Marche', {
    Id_marche: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    tableName: 'marche', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });