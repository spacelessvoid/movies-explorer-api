const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [2, "Name should be at least 2 characters long"],
      maxLength: [30, "Name should be less than 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("user", userSchema);
