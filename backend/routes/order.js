const express = require("express");

const { postOrder } = require("../controllers/orderController");
const router = express.Router();

router.route("/").post(postOrder);

module.exports = router;
