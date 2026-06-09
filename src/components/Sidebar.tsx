import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const styles = {
    sidebar: {
      width: "250px",
      height: "100vh",
      background: "rgba(15,23,42,0.95)",
      backdropFilter: "blur(15px)",
      borderRight: "1px solid rgba(255,255,255,0.08)",
      color: "#fff",
      padding: "25px 20px",
      position: "fixed" as const,
      left: 0,
      top: 0,
      boxShadow: "8px 0 25px rgba(0,0,0,0.35)",
      zIndex: 999,
    },

    logo: {
      textAlign: "center" as const,
      marginBottom: "40px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      paddingBottom: "20px",
    },

    title: {
      margin: 0,
      color: "#38bdf8",
      fontSize: "24px",
      fontWeight: "700",
    },

    subtitle: {
      color: "#94a3b8",
      fontSize: "13px",
      marginTop: "5px",
    },

    menu: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "15px",
    },

    item: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      background: "rgba(255,255,255,0.04)",
      color: "#e2e8f0",
      fontSize: "15px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      border: "1px solid rgba(255,255,255,0.05)",
    },

    logout: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      borderRadius: "12px",
      cursor: "pointer",
      background: "rgba(239,68,68,0.08)",
      color: "#f87171",
      fontSize: "15px",
      fontWeight: "600",
      marginTop: "30px",
      border: "1px solid rgba(239,68,68,0.15)",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logo}>
        <h2 style={styles.title}>🚀 AI Coach</h2>
        <div style={styles.subtitle}>
          Career Development 
        </div>
      </div>

      {/* Menu */}
      <div style={styles.menu}>
        <div
          style={styles.item}
          onClick={() => navigate("/dashboard")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(56,189,248,0.12)";
            e.currentTarget.style.border =
              "1px solid rgba(56,189,248,0.3)";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.05)";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          🏠 Dashboard
        </div>

        <div
          style={styles.item}
          onClick={() => navigate("/profile")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(56,189,248,0.12)";
            e.currentTarget.style.border =
              "1px solid rgba(56,189,248,0.3)";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.05)";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          👤 Profile
        </div>

        <div
          style={styles.item}
          onClick={() => navigate("/fields")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(56,189,248,0.12)";
            e.currentTarget.style.border =
              "1px solid rgba(56,189,248,0.3)";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.05)";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          🎤 Interview
        </div>

        <div
          style={styles.item}
          onClick={() => navigate("/resume")}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(56,189,248,0.12)";
            e.currentTarget.style.border =
              "1px solid rgba(56,189,248,0.3)";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.04)";
            e.currentTarget.style.border =
              "1px solid rgba(255,255,255,0.05)";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          📄 Resume Analyzer
        </div>

        {/* Logout */}
        <div
          style={styles.logout}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(239,68,68,0.15)";
            e.currentTarget.style.transform =
              "translateX(6px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "rgba(239,68,68,0.08)";
            e.currentTarget.style.transform =
              "translateX(0px)";
          }}
        >
          🚪 Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;