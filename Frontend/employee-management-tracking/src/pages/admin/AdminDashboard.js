import DashboardLayout from "../../layouts/DashboardLayout";
import StatCard from "../../components/StatCard";
import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";


function AdminDashboard() {
  const [stats, setStats] = useState({
  totalEmployees: 0,
  pendingLeaves: 0,
  approvedLeaves: 0,
  rejectedLeaves: 0,
});

useEffect(() => {
  fetchStats();
}, []);
const fetchStats = async () => {
  try {
    const res = await API.get("/dashboard/stats");

    setStats(res.data);
  } catch (error) {
    toast.error("Something went wrong");
  }
};
  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "700",
            color: "#111827",
          }}
        >
          Welcome Back 👋
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Here's what's happening in your organization today.
        </p>
      </div>

      {/* Statistics Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        <StatCard
  title="Total Employees"
  value={stats.totalEmployees}
/>
<StatCard
  title="Pending Leaves"
  value={stats.pendingLeaves}
/>

       <StatCard
  title="Approved Leaves"
  value={stats.approvedLeaves}
/>

       <StatCard
  title="Rejected Leaves"
  value={stats.rejectedLeaves}
/>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;