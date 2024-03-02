//  -- 1 -- to run the backend type "npm run backend"
const env = require("dotenv").config(); // ! to access our environment variable
const express = require("express"); // ! the framework
const mongoose = require("mongoose"); // ! helps us to connect to mongoDB
const cors = require("cors"); // ! helps resolve connection issue between the frontend and backend
const cookieParser = require("cookie-parser"); // ! helps authenticate our users using cookies
const errorHandler = require("./middleware/errorMiddleware");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const brandRoute = require("./routes/brandRoute");
const couponRoute = require("./routes/couponRoute");
const orderRoute = require("./routes/orderRoute");
const transactionRoute = require("./routes/transactionRoute");

const app = express();

/*   >> Cookie parser and cors must be on top, otherwise if w'ere using insomnia/postman
      for testing it won't work. */
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://keipy.vercel.app"],
    credentials: true,
  })
);

/*  >> Routes for `wallet` only and must be on top of `app.use(express.json());`
     To `avoid applying stripe web hook` to app.use(express.json()); */
app.use("/api/transaction", transactionRoute);

// ! Middlewares (3)
app.use(express.json());

// ! Routes (1)
app.get("/", (req, res) => {
  res.send("Home Page...");
});

// * Error Middleware -- To elegantly display errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// * All routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/order", orderRoute);

// ! Mongoose (2)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
