const env = require("dotenv").config(); // ! to access our environment variable
const express = require("express"); // ! the framework
const mongoose = require("mongoose"); // ! helps us to connect to mongoDB
const cors = require("cors"); // ! helps resolve connection issue between the frontend and backend
const cookieParser = require("cookie-parser"); // ! helps authenticate our users using cookies

const app = express();

// ! Routes
app.get("/", (req, res) => {
  res.send("Home Page...");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
