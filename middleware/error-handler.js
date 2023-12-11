const { CustomerAPIError } = require("../error/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomerAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Something went worng..." });
};

module.exports = errorHandlerMiddleware;
