import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const VendreEquipement = sequelize.define('VendreEquipement', {
    Id_equipement: {
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
      name: 'pk_vendre_equipement',
      columns: ['Id_equipement', 'Id_marche']
    }
  }, {
    tableName: 'vendreequipement', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });