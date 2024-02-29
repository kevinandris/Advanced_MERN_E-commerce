// -- 2 --
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

// ! The body of the user properties
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true /* 2 or more users are not going to have the same email */,
    trim: true /* if there is a space either at the front or end it will automatically removed */,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [6, "Password must be up to 6 characters"],
    // maxLength: [23, "Password must not be longer than 23 characters"], /* // TODO - had to comment out to test the update user function */
  },
  role: {
    type: String,
    required: [true],
    default: "customer",
    enum: ["customer", "admin"],
  },
  photo: {
    type: String,
    required: [true, "Please add a photo"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  phone: {
    type: String,
    default: "+234",
  },
  balance: {
    type: Number,
    default: 0,
  },
  address: {
    type: Object,
    // address, state, country
  },
  cartItems: {
    type: [Object],
  },
  stripeCustomerId: {
    type: String,
  },
});

// ! Encrypt password before saving to MongoDB -- this is a callback function
userSchema.pre(
  "save",
  async function (next) {
    if (!this.isModified("password")) {
      return next();
    }

    // * Hash password -- don't forget the "await" keyword because this is an async function otherwise the password wont be hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  },
  {
    timestamps: true,
  } /* this will display the object's date that was created */
);

const User = mongoose.model("User", userSchema);
module.exports = User;
