const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");

const {
  addTransaction,
  getTransactions,
} = require("../controllers/transaction");

router.post("/", auth, addTransaction);
router.get("/:userId", auth, getTransactions);

module.exports = router;
