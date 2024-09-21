const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a user name."],
    },
    email: {
      type: String,
      required: [true, "Please enter a user email address."],
      unique: [true, "Email address is already in use."],
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
    },
  },
  {
    Timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
