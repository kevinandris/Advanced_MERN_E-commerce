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

const app = express();

// ! Middlewares (3)
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ecommerceapp.vercel.app"],
    credentials: true,
  })
);

// ! Routes (1)
app.get("/", (req, res) => {
  res.send("Home Page...");
});

// * Error Middleware -- To elegantly display errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// * All routes for users
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
