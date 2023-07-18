import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Fabriquer = sequelize.define('Fabriquer', {
    nom: {
      type: DataTypes.STRING(50)
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    attaque: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    defence: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    degat: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    solidite: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    usure: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    fer: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    bois: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    gold: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    lvlforge: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    lvlforgeron: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    primaryKey: {
      name: 'pk_fabriquer',
      columns: ['nom']
    }
  }, {
    tableName: 'fabriquer', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });