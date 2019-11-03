const router = require("express").Router();
const { check, validationResult } = require("express-validator");

const Transaction = require("../models/Transaction");
const User = require("../models/User");
const { serverError } = require("../util/errors");
const authenticate = require("../config/authenticate");

// @route   GET api/transaction
// @desc    Get all transaction
// @access  Private
router.get("/", authenticate, async (req, res) => {
  let { _id } = req.user;
  try {
    const transaction = await Transaction.find({ user: _id });
    if (transaction.length === 0) {
      res.status(404).json({ message: "No transaction found" });
    } else {
      res.status(200).json(transaction);
    }
  } catch (error) {
    serverError(res, error);
  }
});

// @route   POST api/transaction
// @desc    Add new transaction
// @access  Private
router.post(
  "/",
  authenticate,
  [
    check("amount", "Please enter amount")
      .not()
      .isEmpty(),
    check("note", "Please provide note")
      .not()
      .isEmpty(),
    check("type", "Please provide type of your transaction")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { amount, note, type } = req.body;
    let userId = req.user._id;

    let transaction = new Transaction({
      amount,
      note,
      type,
      user: userId
    });

    try {
      const result = await transaction.save();
      let updatedUser = { ...req.user._doc };
      if (type === "income") {
        updatedUser.balance = updatedUser.balance + amount;
        updatedUser.income = updatedUser.income + amount;
      } else if (type === "expense") {
        updatedUser.balance = updatedUser.balance - amount;
        updatedUser.expense = updatedUser.expense + amount;
      }
      updatedUser.transactions.unshift(result._id);

      await User.findByIdAndUpdate(
        updatedUser._id,
        { $set: updatedUser },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "Transaction Created Successfully", ...result._doc });
    } catch (error) {
      serverError(res, error);
    }
  }
);

// @route   GET api/:transactionId
// @desc    Get single transaction information
// @access  Private
router.get("/:transactionId", async (req, res) => {
  let { transactionId } = req.params;

  try {
    const result = await Transaction.findById(transactionId);
    if (!result) {
      res.status(404).json({ message: "No transaction found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    serverError(res, error);
  }
});

// @route   PUT api/:transactionId
// @desc    Update transaction
// @access  Private
router.put("/:transactionId", async (req, res) => {
  let { transactionId } = req.params;
  try {
    const result = await User.findByIdAndUpdate(
      transactionId,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ message: "Updated Successfully", ...result });
  } catch (error) {
    serverError(res, error);
  }
});

// @route   DELETE api/:transactionId
// @desc    Delete transaction
// @access  Private
router.delete("/:transactionId", async (req, res) => {
  let { transactionId } = req.params;

  try {
    const result = await User.findByIdAndRemove(transactionId);
    res.status(200).json({ message: "Delete Successfully" });
  } catch (error) {
    serverError(res, error);
  }
});

module.exports = router;
