const Leave = require("../models/Leave");

const applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      employee: req.user.id,
      leaveType: req.body.leaveType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      employee: req.user.id,
    });

    res.json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "name email role");

    res.json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
      },
      {
        new: true,
      }
    );

    res.json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      {
        new: true,
      }
    );

    res.json(leave);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
};