import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database'; // Importez l'instance de Sequelize

export const SuivreCombatant = sequelize.define('SuivreCombatant', {
  Id_joueur: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Id_combatant: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  primaryKey: {
    name: 'pk_suivre_combatant',
    columns: ['Id_joueur', 'Id_combatant']
  }
}, {
  tableName: 'suivrecombatant', // Nom de la table dans la base de données
  timestamps: false // Désactiver les timestamps automatiques (createdAt, updatedAt)
});