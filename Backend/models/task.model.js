const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    tableName: "tasks",
    timestamps: false,
  }
);

module.exports = Task;
