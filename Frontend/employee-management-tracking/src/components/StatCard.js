function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        minHeight: "130px",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: "15px",
        }}
      >
        {title}
      </p>

      <h2
        style={{
          marginTop: "15px",
          fontSize: "42px",
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatCard;