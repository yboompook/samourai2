import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Equipement = sequelize.define('mon_equipement', {
    Id_equipement: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50)
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
    effet: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    puissance: {
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
    tableName: 'equipement', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });
  