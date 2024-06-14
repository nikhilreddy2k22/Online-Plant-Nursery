const express = require("express");

const {
  cartDetails,
  addToCart,
  removeFromCart,
  removeAllFromCart,
} = require("../controllers/cartController");
const router = express.Router();

router.route("/:userId").get(cartDetails);
router.route("/addtocart").put(addToCart);
router.route("/removefromcart/:userId/:productId").put(removeFromCart);
router.route("/removeallfromcart/:userId").put(removeAllFromCart);
module.exports = router;
