import { Dialect, Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    port: +process.env.DB_PORT!,
    dialect: process.env.DB_DIALECT! as Dialect,
    logging: false,
  },
);

export default sequelize;
