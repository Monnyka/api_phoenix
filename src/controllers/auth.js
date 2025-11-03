const User = require("../../src/models/User");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../../src/error/custom-error");
const jwt = require("jsonwebtoken");

const isEmailExists = async (email) => {
  return await User.exists({ email });
};

const register = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(
      createCustomError("Please provide name, email and password", 400)
    );
  }
  if (password.length < 6) {
    return next(createCustomError("Please provide 6 digits password", 400));
  }

  // Check if the email already exists
  const emailExists = await isEmailExists(email);
  if (emailExists) {
    return next(createCustomError("Email already exists", 400));
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createCustomError("Please provide email and password", 401));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(createCustomError("Invalid credentials", 401));
  }

  // Check if user has a password (not OAuth-only account)
  if (!user.password) {
    return next(
      createCustomError(
        "This account uses GitHub login. Please sign in with GitHub",
        401
      )
    );
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(createCustomError("Invalid credentials", 401));
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
});

const githubCallback = async (req, res) => {
  // User is authenticated via passport
  const user = req.user;

  // Generate JWT token using the user's createJWT method
  const token = user.createJWT();

  // Return JSON response with user and token
  res.status(StatusCodes.OK).json({
    user: { name: user.name, email: user.email },
    token,
  });
};

module.exports = { register, login, githubCallback };
