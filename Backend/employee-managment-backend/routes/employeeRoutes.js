const protect = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const authorizeRoles  = require("../middleware/roleMiddleware");

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// TEMP (we will protect later)
router.get("/",protect,authorizeRoles("admin", "manager"), getEmployees);
router.post("/",protect,authorizeRoles("admin"), createEmployee);
router.put("/:id",protect,  authorizeRoles("admin", "manager"),updateEmployee);
router.delete("/:id",protect, authorizeRoles("admin"), deleteEmployee);

module.exports = router;