const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");
const { createCustomerError } = require("../error/custom-error");

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
    return next(createCustomerError("Please provide 6 digits password", 400));
  }

  // Check if the email already exists
  const emailExists = await isEmailExists(email);
  if (emailExists) {
    return next(createCustomerError("Email already exists", 400));
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createCustomerError("Please provide email and password", 401));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(createCustomerError("Invalid credentials", 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(createCustomerError("Invalid credentials", 401));
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
});

module.exports = { register, login };
