const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "Username must be at least 3 characters long",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: "users",
  }
);

User.associate = (models) => {
  User.hasMany(models.Task, {
    foreignKey: "userId",
    as: "tasks",
    onDelete: "CASCADE",
    hooks: true
  });
};

module.exports = User;
