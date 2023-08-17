import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Joueur from './joueurs.js';

export class Combatant extends Model {
  // Your model definition here
}

Combatant.init(
  {
    // Define the model attributes based on your SQL table schema
    Id_combatant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    vitalite: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    endurance: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    puissance: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    dexterite: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    fatigue: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    niveau: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Combatant',
    timestamps: false,
    tableName: 'combatant',
  }
);

Combatant.belongsTo(Joueur, { foreignKey: 'Id_joueur', as: 'Joueur' });

export default Combatant;
