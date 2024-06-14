const express = require("express");

const { createAccount, login } = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(createAccount);
router.route("/signin").post(login);

module.exports = router;
