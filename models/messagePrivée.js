import { DataTypes, Model } from 'sequelize';
import sequelize from '../database.js';

export default class Messageprive extends Model {
  // Your model definition here
}

Messageprive.init(
  {
    Id_messageprive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    titre: {
      type: DataTypes.STRING(100),
    },
    corps: {
      type: DataTypes.TEXT,
    },
    jour: {
      type: DataTypes.INTEGER,
    },
    Id_joueur: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'joueur', // Utiliser le nom de la table pour la référence
        key: 'Id_joueur',
      },
    },
    Id_joueur_1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'joueur', // Utiliser le nom de la table pour la référence
        key: 'Id_joueur',
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Messageprive',
    timestamps: false,
    tableName: 'messageprive',
  }
);

// Export the function that sets up the associations
export const setupAssociations = async () => {
  const { default: Joueur } = await import('./joueurs.js');

  // Définir les associations avec le modèle "Joueur"
  Messageprive.belongsTo(Joueur, { foreignKey: 'Id_joueur' });
  Messageprive.belongsTo(Joueur, { foreignKey: 'Id_joueur_1', as: 'JoueurDestinataire' });
};
