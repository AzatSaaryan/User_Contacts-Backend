const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const chalk = require("chalk");

connectDB();
const app = express();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(chalk.red.bgWhite.bold("Server listening on port " + PORT));
});

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/usersRoutes"));
app.use(errorHandler);
// app.use(connectDB);

app.get("/", (req, res) => {
  res.send("Welcome");
});
