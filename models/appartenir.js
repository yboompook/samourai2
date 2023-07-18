import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Appartenir = sequelize.define('Appartenir', {
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_clan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    iscreateur: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    primaryKey: {
      name: 'pk_appartenir',
      columns: ['Id_joueur', 'Id_clan']
    }
  }, {
    tableName: 'appartenir', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });