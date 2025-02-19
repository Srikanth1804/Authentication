const { default: mongoose } = require("mongoose");
let Mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

let UserModel = Mongoose.model("Usermodel", UserSchema);

module.exports = UserModel;
