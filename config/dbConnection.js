const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      chalk.green.bgWhite.bold(
        "Database connected successfully",
        connect.connection.host,
        connect.connection.name
      )
    );
  } catch (error) {
    console.log(chalk.red.bgWhite.bold("Connection error", error.message));
    process.exit(1);
  }
};

module.exports = connectDB;
