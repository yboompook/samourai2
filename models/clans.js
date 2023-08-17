// clan.js

import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';
import Joueur from './joueurs.js';

class Clan extends Model {
  // Your model definition here
}

Clan.init(
  {
    // Define the model attributes based on your SQL table schema
    Id_clan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Clan',
    timestamps: false,
    tableName: 'clan',
  }
);

// Export the model
export default Clan;

// Define the associations inside the function setupAssociations
Clan.setupAssociations = async () => {
  const { default: Appartenir } = await import('./appartenir.js');

  // Define the associations with the model "Appartenir"
  Clan.hasMany(Appartenir, { foreignKey: 'Id_clan' });
  Clan.belongsToMany(Joueur, { through: Appartenir, foreignKey: 'Id_clan', otherKey: 'Id_joueur' });
};
