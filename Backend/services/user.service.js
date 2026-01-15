const { where } = require("sequelize");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (firstname, lastname, email, hashedPassword) => {
  const user = await userModel.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  return user;
};

const logInUser = async (email, password) => {
  const user = await userModel.findOne({ where: { email: email } });
  if (!user) {
    return user;
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return;
  }
  return user;
};

const deleteUser = async (email, password) => {
  const user = await userModel.findOne({ where: { email: email } });
  if (!user) {
    return false;
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return false;
  }
  await user.destroy();
  const deleted = true;
  return deleted;
};

const getName = async (id) => {
  const user = await userModel.findByPk(id);
  if(!user){
    return;
  }
  return user;
};

module.exports = {
  createUser,
  logInUser,
  deleteUser,
  getName
};
