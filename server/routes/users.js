const express = require("express");
const { protect } = require("../middleware/protect");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  currentUser,
} = require("../controller/users");

const router = express.Router();

router.route("/").get(protect, getUsers).post(protect, createUser);
router
  .route("/:id")
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, deleteUser);
router.route("/login").post(loginUser);
router.route("/current/user").get(protect, currentUser);

module.exports = router;
