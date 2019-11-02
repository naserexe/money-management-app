const loginValidator = require("../validator/loginValidator");
const registerValidator = require("../validator/registerValidator");
const { serverError, resourceError } = require("../util/errors");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User's Controller
module.exports = {
  register: async (req, res) => {
    const { name, email, password, password2 } = req.body;
    let validate = registerValidator({ name, email, password, password2 });

    if (!validate.isValid) {
      res.status(400).json(validate.error);
    } else {
      try {
        const returnData = await User.findOne({ email });

        if (returnData) {
          return resourceError(res, 400, "Email already exist");
        } else {
          bcrypt.hash(password, 11, async (error, hash) => {
            if (error) {
              return serverError(res, error);
            }

            let user = new User({
              name,
              email,
              password: hash,
              balance: 0,
              income: 0,
              expense: 0,
              transactions: []
            });

            await user.save();
            res.status(201).json({
              message: "User cerated successfully",
              user
            });
          });
        }
      } catch (error) {
        serverError(res, error);
      }
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    let validate = loginValidator({ email, password });

    if (!validate.isValid) {
      return res.status(400).json(validate.error);
    }

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return resourceError(res, 404, "User not found");
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return serverError(res, err);
        }

        if (!result) {
          return resourceError(res, 401, "Incorrect password");
        }

        let token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            amount: user.amount,
            income: user.income,
            expense: user.expense,
            transactions: user.transactions
          },
          "naser",
          { expiresIn: "2h" }
        );

        res
          .status(200)
          .json({ message: "Login successful", token: `Bearer ${token}` });
      });
    } catch (error) {
      serverError(res, error);
    }
  },
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  }
};
