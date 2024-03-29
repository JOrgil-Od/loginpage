const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const MyError = require("../utils/myError");
const User = require("../models/user");

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new MyError("Таны эрх хүрэхгүй байна! ", 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new MyError("Токен дууссан байна! ", 401);
  }
  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(tokenObj.id);
  next();
});
