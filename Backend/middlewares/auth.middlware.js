const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ messsage: "Token Unavaiable" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ messsage: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).messsage({ messsage: err.messsage });
  }
};

module.exports = authUser;
