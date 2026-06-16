import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();

    navigate("/");
  };

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/employees": "Employees",
    "/leaves/ApplyLeave": "Apply Leave",
    "/leaves/MyLeaves": "My Leaves",
    "/leaves/LeaveRequests": "Leave Requests",
    "/admin/reviews": "Performance Reviews",
  };

  const currentTitle = pageTitles[location.pathname] || "Welcome";
  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: window.innerWidth <= 768 ? "0 15px" : "0 30px",
        flexWrap: "wrap",
        justifyContent: "space-between",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left */}
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          {currentTitle}
        </h2>
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Notifications */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
          }}
        >
          <NotificationsNoneIcon />

          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
        </div>

        {/* User */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
              color: "white",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {window.innerWidth > 768 && (
            <div>
              <div>{user?.name}</div>
              <div>{user?.role}</div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            border: "none",
            background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
            color: "white",
            padding: "10px 16px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <LogoutIcon fontSize="small" />
          {window.innerWidth > 768 && "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
