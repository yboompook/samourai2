import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

export const VendreRessource = sequelize.define('VendreRessource', {
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_marche: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    achat: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    primaryKey: {
      name: 'pk_vendre_ressource',
      columns: ['Id_joueur', 'Id_marche', 'nom']
    }
  }, {
    tableName: 'vendreressource', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });
  