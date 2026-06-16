const Employee = require("../models/Employee");

// GET all employees
const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// CREATE employee
const createEmployee = async (req, res) => {
  const employee = await Employee.create(req.body);
  res.json(employee);
};

// UPDATE employee
// const updateEmployee = async (req, res) => {
//   const updated = await Employee.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(updated);
// };

// DELETE employee
// const deleteEmployee = async (req, res) => {
//   await Employee.findByIdAndDelete(req.params.id);
//   res.json({ message: "Employee deleted" });
// };

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

