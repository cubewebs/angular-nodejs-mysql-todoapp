import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('todos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
