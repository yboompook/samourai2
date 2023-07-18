import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database'; // Importez l'instance de Sequelize

export const SuivreJoueur = sequelize.define('SuivreJoueur', {
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_joueur_1: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    primaryKey: {
      name: 'pk_suivre_joueur',
      columns: ['Id_joueur', 'Id_joueur_1']
    }
  }, {
    tableName: 'suivrejoueur', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
  });