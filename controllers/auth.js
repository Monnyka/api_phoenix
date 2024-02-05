const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");
const { createCustomerError } = require("../error/custom-error");
const bcrypt = require("bcryptjs");

const isEmailExists = async (email) => {
  return await User.exists({ email });
};

const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createCustomerError("Please provide name, email and password", 400)
    );
  }
  if (password.length < 6) {
    return next(createCustomerError("Please provide 6 digit password", 400));
  }

  // Check if the email already exists
  const emailExists = await isEmailExists(email);
  if (emailExists) {
    return next(createCustomerError("Email already exists", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
});

const login = async (req, res) => {
  res.send("Login User");
};

module.exports = { register, login };
