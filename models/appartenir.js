// appartenir.js

import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

export default class Appartenir extends Model {
  // Your model definition here
}

Appartenir.init(
  {
    // Define the model attributes based on your SQL table schema
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Joueur', // Utiliser le nom de la table pour la référence
        key: 'Id_joueur',
      },
    },
    Id_clan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Clan', // Utiliser le nom de la table pour la référence
        key: 'Id_clan',
      },
    },
    iscreateur: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Appartenir',
    timestamps: false,
    tableName: 'appartenir',
  }
);

// Export the model
//export default Appartenir;

// Export the function that sets up the associations
export const setupAssociations = async () => {
  const { default: Joueur } = await import('./joueurs.js');
  const { default: Clan } = await import('./clans.js');

  // Définir les associations avec les modèles "Joueur" et "Clan"
  Appartenir.belongsTo(Joueur, { foreignKey: 'Id_joueur' });
  Appartenir.belongsTo(Clan, { foreignKey: 'Id_clan' });
  Joueur.belongsToMany(Clan, { through: Appartenir, foreignKey: 'Id_joueur', otherKey: 'Id_clan' });
  Clan.belongsToMany(Joueur, { through: Appartenir, foreignKey: 'Id_clan', otherKey: 'Id_joueur' });
};
