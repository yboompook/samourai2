import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const Combatre = sequelize.define('Combattre', {
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_joueur_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre_de_round: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    resultat: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    primaryKey: {
      name: 'pk_combattre',
      columns: ['Id_joueur', 'Id_joueur_1']
    }
  }, {
    tableName: 'combatre', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });