import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Forum = sequelize.define('Forum', {
    Id_forum: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ispublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Id_clan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clan,
        key: 'Id_clan'
      }
    }
  }, {
    tableName: 'forum', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });