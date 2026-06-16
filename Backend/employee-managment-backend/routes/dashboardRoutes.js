const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles =
  require("../middleware/roleMiddleware");

const {
  getDashboardStats,getEmployeeDashboardStats
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  protect,
  authorizeRoles("admin", "manager"),
  getDashboardStats
);
router.get("/", protect, getDashboardStats);

router.get(
  "/employee",
  protect,
  getEmployeeDashboardStats
);
module.exports = router;