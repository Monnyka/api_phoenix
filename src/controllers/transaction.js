const Transaction = require("../src/models/Transaction");
const User = require("../src/models/User");

// Add a new transaction (income or expense)
const addTransaction = async (req, res) => {
  try {
    const { userId, type, amount, description } = req.body;

    // Validate input
    if (!userId || !type || !amount || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!["income", "expense"].includes(type)) {
      return res
        .status(400)
        .json({ message: 'Type must be "income" or "expense"' });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    // Find the user
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle balance logic
    if (type === "expense") {
      if (user.balance <= 0) {
        return res
          .status(400)
          .json({ message: "Insufficient balance: Your balance is 0" });
      }
      if (user.balance < amount) {
        return res.status(400).json({
          message: `Insufficient balance: Only ${user.balance} available`,
        });
      }
      user.balance -= amount; // Deduct expense
    } else if (type === "income") {
      user.balance += amount; // Add income
    }

    // Save the updated balance
    await user.save();

    // Save the transaction
    const transaction = new Transaction({
      userId,
      type,
      amount,
      description,
    });
    const savedTransaction = await transaction.save();

    res.status(201).json({
      message: "Transaction added successfully",
      transaction: savedTransaction,
      currentBalance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all transactions for a user (with balance)
const mongoose = require("mongoose");

const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({
      userId: mongoose.Types.ObjectId(userId),
    });
    const user = await User.findById(userId);
    const balance = user ? user.balance : 0;

    res.status(200).json({
      transactions,
      currentBalance: balance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addTransaction, getTransactions };
