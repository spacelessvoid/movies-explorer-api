const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "This field is required"],
      minLength: [2, "This field should be at least 2 characters long"],
      maxLength: [30, "This field should be no more than 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "This field is required"],
      select: false,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("user", userSchema);