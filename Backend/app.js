require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { authDb, sequelize } = require("./config/db");
const app = express();
const port = process.env.PORT;
const user = require("./routes/user.route");
const task = require("./routes/task.route");
const cookie = require("cookie-parser");
const authUser = require("./middlewares/auth.middlware");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookie());


app.use("/user", user);
app.use("/task", authUser, task);

server.listen(port, async () => {
  console.log(`Server is listening to ${port}`);
  await authDb();
});
