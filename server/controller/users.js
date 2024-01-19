const User = require("../models/user");
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

// get all users
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
});

// get user
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new MyError(req.params.id + "ID тай хэрэглэгч олдсонгүй!", 400);
  }
  res.status(200).json({ success: true, data: user });
});

// create user
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  const jwt = user.getJWT();
  res.status(200).json({ success: true, data: user, token: jwt });
});

// update user
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  if (!user) {
    throw new MyError(req.params.id + "ID тай хэрэглэгч олдсонгүй!", 400);
  }
  res.status(200).json({ success: true, data: user });
});

// delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new MyError(req.params.id + "ID тай хэрэглэгч олдсонгүй!", 400);
  }
  res.status(200).json({ success: true, data: user });
});

// login hiih
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new MyError("Имайл эсвэл нууц үгээ дамжуулна уу!");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new MyError("Имайл эсвэл нууц үг буруу байна!", 401);
  }

  const loginCheck = await user.checkPassword(password);
  if (!loginCheck) {
    throw new MyError("Имайл эсвэл нууц үг буруу байна!", 401);
  }

  res.status(200).json({ success: true, data: user, token: user.getJWT() });
});

//current user
exports.currentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
