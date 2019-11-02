const express = require("express");
const morgan = require("morgan");

const connectDB = require("./config/db");
const user = require("./routes/users");

const app = express();
// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use("/api/users", user);

app.get("/", (req, res) => {
  res.json("Welcome to our application");
});

app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
