const Cart = require("../models/cart");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.cartDetails = catchAsync(async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (err) {
    console.log(err.message);
    return next(new AppError("cannot get details", 400));
  }
});
exports.addToCart = catchAsync(async (req, res, next) => {
  try {
    const { userId, productData } = req.body;

    let cart = await Cart.findOne({ user: userId });

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ user: userId });
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.cartItems.findIndex((item) =>
      item.product.equals(productData.product)
    );
    // console.log(existingProductIndex);
    if (existingProductIndex !== -1) {
      cart.cartItems[existingProductIndex].quantity = productData.quantity || 1;
    } else {
      cart.cartItems.push({
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity || 1,
        image: productData.image,
        product: productData.product,
      });
    }
    await cart.save();
    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return next(new AppError("cannot add to cart", 400));
  }
});

exports.removeFromCart = catchAsync(async (req, res, next) => {
  try {
    const { userId, productId } = req.params; // Assuming userId and productId are sent as route parameters

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new AppError(" cart not found", 404));
    }

    // Find the index of the item to remove
    const itemIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return next(new AppError("item not found in  cart", 404));
    }

    // Remove the item from the cart
    cart.cartItems.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      status: "success",
      data: {
        cart: cart,
      },
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return next(new AppError("cannot remove from cart", 400));
  }
});

exports.removeAllFromCart = catchAsync(async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is in the URL params

    // Update the cart document to remove all items
    const updateResult = await Cart.updateOne(
      { user: userId },
      { $set: { cartItems: [] } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const updatedCart = await Cart.findOne({ user: userId });

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({
      status: "success",
      data: {
        cart: updatedCart,
      },
    });
  } catch (error) {
    console.error("Error removing items from cart:", error);
    return next(new AppError("cannot remove all from cart", 400));
  }
});
