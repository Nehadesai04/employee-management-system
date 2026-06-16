import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";

function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const role = user?.role;

  let menuItems = [];

  if (role === "admin") {
    menuItems = [
      {
        text: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
      },
      {
        text: "Employees",
        path: "/admin/Employees",
        icon: <PeopleIcon />,
      },
      {
        text: "Leave Requests",
        path: "/leaves/LeaveRequests",
        icon: <AssignmentIcon />,
      },
      {
        text: "Profile",
        path: "/profile/Profile",
        icon: <PersonIcon />,
      },
    ];
  } else if (role === "manager") {
    menuItems = [
      {
        text: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
      },
      {
        text: "Employees",
        path: "/admin/Employees",
        icon: <PeopleIcon />,
      },
      {
        text: "Leave Requests",
        path: "/leaves/LeaveRequests",
        icon: <AssignmentIcon />,
      },
      {
        text: "Profile",
        path: "/profile/Profile",
        icon: <PersonIcon />,
      },
    ];
  } else if (role === "employee") {
    menuItems = [
      {
        text: "Dashboard",
        path: "/employee/EmployeeDashboard",
        icon: <DashboardIcon />,
      },
      {
        text: "Apply Leave",
        path: "/leaves/ApplyLeave",
        icon: <EventNoteIcon />,
      },
      {
        text: "My Leaves",
        path: "/leaves/MyLeaves",
        icon: <AssignmentIcon />,
      },
      {
        text: "Profile",
        path: "/profile/Profile",
        icon: <PersonIcon />,
      },
    ];
  }

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        display: window.innerWidth <= 768 ? "none" : "flex",
        background: "#0f172a",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "24px",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        style={{
          marginBottom: "40px",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          WorkSphere
        </h1>

        <p
          style={{
            marginTop: "5px",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Employee Management
        </p>
      </div>

      {/* Menu */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "12px",
                textDecoration: "none",
                color: active ? "#fff" : "#cbd5e1",
                background: active
                  ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                  : "transparent",
                transition: "all 0.3s ease",
                fontWeight: active ? 600 : 500,
              }}
            >
              {item.icon}
              {item.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
