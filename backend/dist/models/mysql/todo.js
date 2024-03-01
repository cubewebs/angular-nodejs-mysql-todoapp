"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_db_1 = __importDefault(require("../../database/connection.db"));
const Todo = connection_db_1.default.define('Task', {
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    todo_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    done_date: {
        type: sequelize_1.DataTypes.DATE,
    },
    done: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
});
exports.default = Todo;
