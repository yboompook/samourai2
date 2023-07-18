import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Topic = sequelize.define('Topic', {
    Id_topic: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lecture: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    epingle: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Id_forum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Forum,
        key: 'Id_forum'
      }
    }
  }, {
    tableName: 'topic', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });