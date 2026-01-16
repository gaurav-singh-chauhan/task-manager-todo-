const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.contoller");
const authUser = require("../middlewares/auth.middlware");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.delete("/delete", authUser, userController.deleteUser);

router.get("/getUser", authUser, userController.getUser);

module.exports = router;