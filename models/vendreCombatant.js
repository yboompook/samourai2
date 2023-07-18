import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const VendreCombatant = sequelize.define('VendreCombatant', {
    Id_combatant: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_marche: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    primaryKey: {
      name: 'pk_vendre_combatant',
      columns: ['Id_combatant', 'Id_marche']
    }
  }, {
    tableName: 'vendrecombatant', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });