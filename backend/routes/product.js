const express = require("express");

const {
  productDetails,
  products,
  createProduct,
  getProducts,
} = require("../controllers/productController");
const router = express.Router();

router.route("/:productID").get(productDetails);
// router.route("/").get(products);
router.route("/").get(getProducts);
router.route("/").post(createProduct);

module.exports = router;
