const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

const getDashboardStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    const pendingLeaves =
      await Leave.countDocuments({
        status: "Pending",
      });

    const approvedLeaves =
      await Leave.countDocuments({
        status: "Approved",
      });

    const rejectedLeaves =
      await Leave.countDocuments({
        status: "Rejected",
      });

    res.json({
      totalEmployees,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getEmployeeDashboardStats = async (req, res) => {
  try {
    const appliedLeaves = await Leave.countDocuments({
      employee: req.user.id,
    });

    const pendingLeaves = await Leave.countDocuments({
      employee: req.user.id,
      status: "Pending",
    });

    const approvedLeaves = await Leave.countDocuments({
      employee: req.user.id,
      status: "Approved",
    });

    const rejectedLeaves = await Leave.countDocuments({
      employee: req.user.id,
      status: "Rejected",
    });

    res.json({
      appliedLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getEmployeeDashboardStats,
  
};