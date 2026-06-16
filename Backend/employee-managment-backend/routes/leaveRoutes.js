const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles  = require("../middleware/roleMiddleware");


const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
} = require("../controllers/leaveController");

router.post("/", protect,authorizeRoles("admin", "manager", "employee"), applyLeave);
router.get("/my", protect,authorizeRoles("admin", "manager", "employee"), getMyLeaves);
router.get("/", protect,authorizeRoles("admin", "manager"), getAllLeaves);
router.put("/:id/approve", protect,authorizeRoles("admin", "manager"), approveLeave);
router.put("/:id/reject",authorizeRoles("admin", "manager"), protect, rejectLeave);

module.exports = router;