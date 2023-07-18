import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Agrandir = sequelize.define('Agrandir', {
    batiment: {
      type: DataTypes.STRING(50)
    },
    niveau: {
      type: DataTypes.TINYINT
    },
    fer: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    bois: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    gold: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    primaryKey: {
      name: 'pk_agrandir',
      columns: ['batiment', 'niveau']
    }
  }, {
    tableName: 'agrandir', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });