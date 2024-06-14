const Order = require("../models/order");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.postOrder = catchAsync(async (req, res, next) => {
  try {
    req.body.shippingInfo.contact = Number(req.body.shippingInfo.contact);
    req.body.shippingInfo.pincode = Number(req.body.shippingInfo.pincode);
    const newOrder = await Order.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    // next(new AppError(err.messsage, 400));
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});
