import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)"
      }}
    >
      {showSidebar && <Sidebar />}

      <div
        style={{
          marginLeft: showSidebar ? "220px" : "0px",
          flex: 1,
          transition: "0.3s"
        }}
      >
        <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

        {/* MAIN SECTION */}
        <div style={{ padding: "50px" }}>
          
          {/* HERO */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "800",
                letterSpacing: "1px"
              }}
            >
              AI Career Coach 
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
                fontSize: "16px"
              }}
            >
              Boost your career with AI-powered tools
            </p>
          </div>

          {/* CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "30px"
            }}
          >
            {[
              {
                title: "Interview Simulator",
                icon: "🎤",
                path: "/fields"
              },
              {
                title: "Resume Analyzer",
                icon: "📄",
                path: "/resume"
              },
              {
                title: "Job Matcher",
                icon: "💼",
                path: "/job-matcher"
              }
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  padding: "35px",
                  textAlign: "center",
                  cursor: "pointer",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.border = "1px solid #38bdf8";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(56,189,248,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.4)";
                }}
              >
                {/* ICON */}
                <div
                  style={{
                    fontSize: "42px",
                    filter: "drop-shadow(0 0 10px rgba(56,189,248,0.6))"
                  }}
                >
                  {item.icon}
                </div>

                {/* TITLE */}
                <h3
                  style={{
                    marginTop: "15px",
                    color: "#e2e8f0",
                    fontWeight: "600",
                    fontSize: "18px"
                  }}
                >
                  {item.title}
                </h3>

                {/* ACCENT LINE */}
                <div
                  style={{
                    height: "4px",
                    width: "45px",
                    background: "#38bdf8",
                    margin: "15px auto 0",
                    borderRadius: "10px"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;