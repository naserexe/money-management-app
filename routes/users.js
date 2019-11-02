const router = require("express").Router();
const { login, register } = require("../controllers/userController");

router.post("/register", register);

router.post("/login", login);

module.exports = router;
