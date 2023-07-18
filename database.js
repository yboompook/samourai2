import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  "samourai",
  "samourai",
  "samourai",
  {
    host: "localhost",
    dialect: 'mariadb',
    multipleStatements: true
  }
);

export default sequelize;