
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Field {
  id: number;
  name: string;
}

function Fields() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  axios
    .get("https://ai-career-coach-backend-ye2g.onrender.com/fields/")
    .then((res) => {
  const seen = new Map();
  (res.data as Field[]).forEach((f: Field) => {
    if (!seen.has(f.name)) {
      seen.set(f.name, f);
    }
  });
  setFields([...seen.values()]);
})
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
}, []);

  if (loading) {
    return (
      <div style={styles.center}>
        <h2 style={{ color: "#94a3b8" }}>Loading fields...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h1 style={styles.heading}> Select Interview Type</h1>
      <p style={styles.sub}>
        Choose your field to start AI interview practice
      </p>

      {/* GRID */}
      {fields.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>No fields available </p>
      ) : (
        <div style={styles.grid}>
          {fields.map((f) => (
            <div
              key={f.id}
              onClick={() => navigate(`/categories/${f.id}`)}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px) scale(1.02)";
                e.currentTarget.style.border = "1px solid #38bdf8";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(56,189,248,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.border =
                  "1px solid rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.4)";
              }}
            >
              <div style={styles.icon}></div>

              <h3 style={styles.title}>{f.name}</h3>

              <button style={styles.btn}>Start</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Fields;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)",
    minHeight: "100vh",
    padding: "50px",
    textAlign: "center" as const,
    fontFamily: "system-ui",
  },

  center: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  heading: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "1px",
  },

  sub: {
    color: "#94a3b8",
    marginTop: "10px",
    fontSize: "16px",
  },

  grid: {
    marginTop: "45px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    borderRadius: "18px",
    padding: "28px",
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  icon: {
    fontSize: "40px",
    filter: "drop-shadow(0 0 10px rgba(56,189,248,0.6))",
  },

  title: {
    marginTop: "12px",
    color: "#e2e8f0",
    fontWeight: "600",
    fontSize: "18px",
  },

  btn: {
    marginTop: "15px",
    padding: "9px 18px",
    borderRadius: "20px",
    border: "1px solid #38bdf8",
    background: "transparent",
    color: "#38bdf8",
    cursor: "pointer",
    fontWeight: 500,
  },
};
