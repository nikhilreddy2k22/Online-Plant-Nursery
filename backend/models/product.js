const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    default: this.price,
    validator: {
      validator: function (value) {
        return value <= this.price;
      },
      message: "Field 2 must be greater than Field 1",
    },
  },
  description: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String],
    required: true,
  },
  stock: {
    type: Boolean,
    required: true,
  },
  bloomtime: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  maintenance: {
    type: String,
    required: true,
  },
  waterSchedule: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
