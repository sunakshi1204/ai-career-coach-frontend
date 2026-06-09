import { Link, useNavigate } from "react-router-dom";

function Navbar({ toggleSidebar }: any) {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 30px",
        background: "rgba(15,23,42,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        minHeight: "72px",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "#38bdf8",
            fontSize: "22px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          ☰
        </button>
      </div>

      {/* CENTER NAVIGATION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "35px",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {[
          { name: "Dashboard", path: "/" },
          { name: "Interview", path: "/fields" },
          { name: "Resume", path: "/resume" },
          { name: "Jobs", path: "/job-matcher" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              textDecoration: "none",
              color: "#cbd5e1",
              fontSize: "16px",
              fontWeight: "600",
              transition: "0.3s",
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* PROFILE */}
        <div
          onClick={() => navigate("/profile")}
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#38bdf8,#6366f1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "20px",
            color: "white",
            boxShadow: "0 0 20px rgba(56,189,248,0.35)",
          }}
        >
          👤
        </div>

        {/* LOGIN */}
        <Link to="/login">
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "1px solid #38bdf8",
              background: "transparent",
              color: "#38bdf8",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Login
          </button>
        </Link>

        {/* SIGNUP */}
        <Link to="/register">
          <button
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: "#38bdf8",
              color: "#0f172a",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: "0 0 20px rgba(56,189,248,0.25)",
            }}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;