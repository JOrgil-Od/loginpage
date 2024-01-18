const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг оруулна уу!"],
  },
  email: {
    type: String,
    required: [true, "Хэрэглэгчийн имайл хаягийг оруулна уу!"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Имайл хаяг буруу байна!",
    ],
  },
  role: {
    type: String,
    required: [true, "Хэрэглэгчийн эрхийг оруулна уу!"],
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    minLength: 4,
    required: [true, "Нууц үгийг оруулна уу!"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJWT = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_AT_EXPIRE,
  });
  return token;
};

UserSchema.methods.checkPassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
