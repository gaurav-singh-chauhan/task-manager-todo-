const userService = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const userModel = require("../models/user.model");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

function generateAuthToken(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  console.log(token);
  return token;
}

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !email || !password) {
    throw new Error("* fields are required");
  }

  try {
    const isAlreadyExisted = await userModel.findOne({
      where: { email: email },
    });
    if (isAlreadyExisted) {
      return res.status(401).json({ message: "User already exist" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await userService.createUser(
      firstname,
      lastname,
      email,
      hashedPassword
    );

    // const token = generateAuthToken(user);

    // res.cookie("token", token);

    res.status(200).json({ message: "User successfully registered", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Something went wrong: ${err.message}`, err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({ message: "All fields are required" });
  }
  try {
    const user = await userService.logInUser(email, password);
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const token = generateAuthToken(user);
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
    });
    res.status(200).json({ message: "Welcome Back :)" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "successfully logged out" });
};

const deleteUser = async (req, res) => {
  const { email } = req.user;
  const { password } = req.body;
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }
  try {
    const user = await userService.deleteUser(email, password);
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    if (user) {
      res.clearCookie("token");
      return res.status(200).json({ message: "User successfully deleted" });
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    res.status(401).json({ message: "User id required" });
  }
  try {
    const user = await userService.getUser(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ username: user.firstname });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  deleteUser,
  getUser,
};
