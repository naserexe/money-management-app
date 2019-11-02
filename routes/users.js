const router = require("express").Router();
const {
  login,
  getAllUsers,
  register
} = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);
router.get("/all", getAllUsers);

module.exports = router;
