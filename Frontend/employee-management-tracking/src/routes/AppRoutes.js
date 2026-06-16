import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Employees from "../pages/admin/Employees";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";
import ApplyLeaves from "../pages/leaves/ApplyLeave";
import MyLeaves from "../pages/leaves/MyLeaves";
import LeaveRequests from "../pages/leaves/LeaveRequests";
import Register from "../pages/auth/Register";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import Profile from "../pages/profile/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "employee"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/EmployeeDashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/leaves/ApplyLeave"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <ApplyLeaves />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/leaves/ApplyLeave" element={<ApplyLeaves />} /> */}
        <Route
          path="/leaves/MyLeaves"
          element={
            <ProtectedRoute>
              <MyLeaves />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaves/LeaveRequests"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]}>
              <LeaveRequests />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/Register" element={<Register />} />
        <Route
          path="/profile/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
