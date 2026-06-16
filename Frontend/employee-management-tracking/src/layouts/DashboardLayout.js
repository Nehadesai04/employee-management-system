import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />

      <div
  style={{
    marginLeft: window.innerWidth > 768 ? "260px" : "0",
    minHeight: "100vh",
    background: "#f8fafc",
  }}
>
        <Navbar />

        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;