const mongoose = require("mongoose");
const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
// app.use(cors);
app.use(cors({ origin: "http://localhost:3000" }));
main().catch((err) => console.log(err));

async function main() {
  if (!process.env.MONGODB_URL) {
    console.error(
      "MONGODB_URL is not defined. Please set the environment variable."
    );
    return;
  }
  db = await mongoose.connect(process.env.MONGODB_URL);
  console.log("database connected");
}

app.listen(process.env.PORT, () => {
  console.log("server started");
});

const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

// Cokkie parser

app.use(cookieParser());

// HTTP security middle wares

app.use(helmet());
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000,
  message: "too many requests from this Ip. please try again after one hour",
});

// Data Sanitization against NOSQL injection

app.use(mongoSanitize());

// Data Sanitization against XSS

app.use(xss());

// prevent parmeter pollution

app.use(hpp());

// Routes

app.use("/", limiter);

app.get("/", async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token found in cookie" });
  }
  console.log("token:", token);
  try {
    // Verify the JWT token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode");
    res.json({ decoded });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Invalid token" });
  }
});

app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

console.log(process.env.PORT);
