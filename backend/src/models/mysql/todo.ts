import { DataTypes } from 'sequelize';
import db from '../../database/connection.db';

const Todo = db.define('Task', {
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  todo_date: {
    type: DataTypes.DATE,
  },
  done_date: {
    type: DataTypes.DATE,
  },
  done: {
    type: DataTypes.BOOLEAN,
  },
});

export default Todo;
