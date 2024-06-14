const Product = require("../models/product");

const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.productDetails = catchAsync(async (req, res, next) => {
  try {
    const productID = req.params.productID;
    console.log(productID);
    if (!productID) {
      return next(new AppError("Provide productID", 400));
    }

    const product = await Product.findOne({ _id: productID });

    if (!product) {
      return next(new AppError("Incorrect ProductID", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.log(err.message);
    return next(new AppError("Incorrect ProductID", 400));
  }
});

exports.products = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "bad request",
    });
  }
};

exports.createProduct = catchAsync(async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(400).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    return next(new AppError("Invalid product Details", 400));
  }
});

exports.getProducts = catchAsync(async (req, res, next) => {
  try {
    if (Object.getOwnPropertyNames(req.query).length === 0) {
      // console.log("query123");
      const products = await Product.find();

      res.status(200).json({
        status: "success",
        data: {
          products,
        },
      });
      return;
    }
    // console.log(req.query);
    const filters = req.query;
    const water = filters.waterSchedule.split(",");
    const maintaince = filters.maintenance.split(",");
    const place = filters.place.split(",");
    const bloomtime = filters.bloomtime.split(",");
    const price = filters.price;
    // console.log(water, maintaince, place);
    const filter = {};
    if (filters.waterSchedule && water.length > 0) {
      filter.waterSchedule = { $in: water };
    }
    if (filters.maintenance && maintaince.length > 0) {
      filter.maintenance = { $in: maintaince };
    }
    if (filters.place && place.length > 0) {
      filter.place = { $in: place };
    }
    if (filters.bloomtime && bloomtime.length > 0) {
      filter.bloomtime = { $in: bloomtime };
    }
    filter.price = { $gte: price };

    // console.log("bloom", bloomtime);
    // console.log("filter", filter);
    const products = await Product.find(filter);

    // console.log("exit");
    // console.log(products);
    res.status(200).json({
      status: "sucesss",
      data: {
        products,
      },
    });
    // console.log(products);
  } catch (err) {
    // console.log(err);
    return next(new AppError("Invalid product Details", 400));
  }
});
