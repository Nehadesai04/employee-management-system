import DashboardLayout from "../../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import API from "../../services/api";

function EmployeeDashboard() {
  const [stats, setStats] = useState({
    appliedLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/employee");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
  <DashboardLayout>
      <h1>Employee Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div className="card">
          <h3>Applied Leaves</h3>
          <h2>{stats.appliedLeaves}</h2>
        </div>

        <div className="card">
          <h3>Pending Leaves</h3>
          <h2>{stats.pendingLeaves}</h2>
        </div>

        <div className="card">
          <h3>Approved Leaves</h3>
          <h2>{stats.approvedLeaves}</h2>
        </div>

        <div className="card">
          <h3>Rejected Leaves</h3>
          <h2>{stats.rejectedLeaves}</h2>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EmployeeDashboard;