const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authUser = require("../middlewares/auth.middlware");

router.get("/", authUser, taskController.getAllTasks);

router.post("/create", authUser, taskController.createTask);

router.put("/edit/:taskId", authUser, taskController.editTask);

router.get("/getDetails/:taskId", authUser, taskController.getDetails);

router.delete("/delete/:taskId", authUser, taskController.deleteTask);

module.exports = router;
