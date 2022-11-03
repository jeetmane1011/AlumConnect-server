const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  getUserById,
  updateUser
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route('/:userId').get(protect, getUserById);
router.route('/:userId').post(protect,updateUser)


module.exports = router;
