const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authUser = async (req, res, next) => {
  const {token} = req.cookies;
  // console.log("auth middlware" ,req.cookies);
  // console.log(token);
  if (!token) {
    return res.status(401).json({ messsage: "Token Unavaiable" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token", decoded);
    const user = await userModel.findByPk(decoded.userId);
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
