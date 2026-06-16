import DashboardLayout from "../../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Modal,
  Box,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  // open modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const emptyMessage =
    employees.length === 0
      ? "No employees added yet"
      : "No matching employees found";

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add employee
  const handleAddEmployee = async () => {
    try {
      setSaveLoading(true);

      if (editId) {
        // Edit functionality will be connected to backend next
        // const updated = employees.map((emp) =>
        //   emp._id === editId ? { ...emp, ...formData } : emp
        // );

        // setEmployees(updated);
        await API.put(`/employees/${editId}`, formData);
        await fetchEmployees();
      } else {
        // Create employee in MongoDB
        await API.post("/employees", formData);

        // Reload employees from database
        await fetchEmployees();
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        department: "",
        role: "",
      });

      // Exit edit mode
      setEditId(null);

      // Close modal
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditId(emp._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await API.delete(`/employees/${id}`);
      await fetchEmployees();

      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete employee");
    } finally {
      setDeletingId(null);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const res = await API.get("/employees");

      setEmployees(res.data);
    } catch (error) {
      toast.error("Failed to fetch employee");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Employees</h2>

        {role === "admin" && (
          <Button variant="contained" onClick={handleOpen}>
            {editId ? "Edit Employee" : "Add Employee"}
          </Button>
        )}

        {/* {user.role === "admin" && (
  <Button onClick={handleOpen}>
    Add Employee
  </Button>
)} */}
      </div>
      <TextField
        label="Search Employee"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "300px",
        }}
      />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          style={{ marginTop: 20, overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{
                      py: 4,
                      color: "#6b7280",
                      fontSize: "16px",
                    }}
                  >
                    {emptyMessage}{" "}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((emp) => (
                  <TableRow key={emp._id}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.role}</TableCell>

                    <TableCell>
                      {(role === "admin" || role === "manager") && (
                        <Button size="small" onClick={() => handleEdit(emp)}>
                          Edit
                        </Button>
                      )}

                      {role === "admin" && (
                        <Button
                          size="small"
                          color="error"
                          disabled={deletingId === emp._id}
                          onClick={() => handleDelete(emp._id)}
                        >
                          {deletingId === emp._id ? "Deleting..." : "Delete"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal Form */}
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h3>{editId ? "Edit Employee" : "Add Employee"}</h3>
          <TextField
            name="name"
            label="Name"
            onChange={handleChange}
            value={formData.name}
          />

          <TextField
            name="email"
            label="Email"
            onChange={handleChange}
            value={formData.email}
          />

          <TextField
            name="department"
            label="Department"
            onChange={handleChange}
            value={formData.department}
          />

          <TextField
            name="role"
            label="Role"
            onChange={handleChange}
            value={formData.role}
          />

          <Button variant="contained" onClick={handleAddEmployee}>
            {saveLoading ? "Saving..." : "Save"}{" "}
          </Button>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Employees;
