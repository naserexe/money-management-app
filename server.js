const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const connectDB = require("./config/db");
const user = require("./routes/users");
const transaction = require("./routes/transaction");

const app = express();
// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(passport.initialize()); // Passport authentication
require("./config/passport")(passport);

// Routes
app.use("/api/users", user);
app.use("/api/transaction", transaction);

app.get("/", (req, res) => {
  res.json("Welcome to our application");
});

app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
