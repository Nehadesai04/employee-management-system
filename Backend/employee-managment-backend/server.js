const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware FIRST
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

const leaveRoutes = require("./routes/leaveRoutes");
app.use("/api/leaves", leaveRoutes);

const dashboardRoutes =
  require("./routes/dashboardRoutes");
  app.use(
  "/api/dashboard",
  dashboardRoutes
);

const PORT = process.env.PORT || 5000;

// connect DB BEFORE server start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});