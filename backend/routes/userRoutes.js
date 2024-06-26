const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// router.get('/', protect, allUsers)
// router.post('/', registerUser)

router.route("/").post(registerUser).get(protect, allUsers);


router.post("/login", authUser);

module.exports = router;
