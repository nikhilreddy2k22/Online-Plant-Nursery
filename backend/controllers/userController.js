const User = require("../models/user");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };
  // if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    // data: {
    //   user,
    // },
    data: user,
  });
};

exports.createAccount = catchAsync(async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    // const token = signToken(newUser._id);
    // console.log("before cookie");
    // res.cookie("jwt", token, {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    //   secure: true,
    // });

    // console.log("after cookie");

    // res.status(201).json({
    //   status: "success",

    //   // data: {
    //   //   user: newUser,
    //   // },
    //   data: newUser,
    // });

    createSendToken(newUser, 201, res);
  } catch (err) {
    // console.log("erre:", err);
    return next(new AppError("Mail is already registered!", 400));
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email);
  if (!email || !password) {
    return next(new AppError("Provide Email or Password", 400));
  }
  const currUser = await User.findOne({ email: email }).select("+password");
  // console.log(currUser);
  // const correct = await currUser.correctPassword(password, currUser.password);
  if (
    !currUser ||
    !(await currUser.correctPassword(password, currUser.password))
  ) {
    return next(new AppError("Incorrect Email or Password", 401));
  }
  // const token = signToken(currUser._id);

  // res.status(200).json({
  //   status: "success",

  //   data: currUser,
  // });

  createSendToken(currUser, 201, res);
});
