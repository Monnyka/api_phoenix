const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createCustomerError } = require("../error/custom-error");

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new next(createCustomerError("Authentication is invalid", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user for task route
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new next(createCustomerError("Authentication is invalid", 401));
  }
};

module.exports = auth;
