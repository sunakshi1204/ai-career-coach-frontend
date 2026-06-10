import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  field_id: number;
}

const categoryIcons: Record<string, string> = {
  dsa: "🧩",
  "web development": "🌐",
  backend: "⚙️",
  dbms: "🗄️",
  "operating system": "💻",
  python: "🐍",
  "machine learning": "🤖",
  statistics: "📊",
  "data analysis": "📈",
  networking: "🔗",
  "ethical hacking": "🛡️",
  cryptography: "🔐",
  "cyber laws": "⚖️",
  regression: "📉",
  classification: "🏷️",
  "neural networks": "🧠",
  "deep learning": "🔬",
  hr: "👥",
};

function CategorySelect() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  
useEffect(() => {
  console.log("FIELD ID:", id);

  axios
    .get(`https://ai-career-coach-backend-ye2g.onrender.com/categories/?field_id=${id}`)
    .then((res) => {
      console.log("CATEGORIES RESPONSE:", res.data);
      setCategories(res.data);
    })
    .catch((err) => console.error("CATEGORY ERROR:", err))
    .finally(() => setLoading(false));
}, [id]);

  // useEffect(() => {
  //   console.log("FIELD ID:", id);
  //   axios
  //     .get(`https://ai-career-coach-backend-ye2g.onrender.com/categories/?field_id=${id}`)
  //     .then((res) => setCategories(res.data))
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // }, [id]);

  if (loading) {
    return (
      <div style={styles.center}>
        <div style={styles.spinner} />
        <p style={{ color: "#94a3b8", marginTop: 16 }}>Loading categories...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.inner}>
        <button style={styles.backBtn} onClick={() => navigate("/fields")}>
          ← Back to Fields
        </button>

        <div style={styles.headerWrap}>
          <h1 style={styles.heading}>Select a Category</h1>
          <p style={styles.sub}>Choose what you want to be interviewed on</p>
        </div>

        {categories.length === 0 ? (
          <p style={{ color: "#94a3b8", textAlign: "center" }}>No categories found ❌</p>
        ) : (
          <div style={styles.grid}>
            {categories.map((cat) => {
              const icon = categoryIcons[cat.name.toLowerCase()] || "🎯";
              return (
                <div
                  key={cat.id}
                  style={styles.card}
                  onClick={() => navigate(`/interview/${id}/${cat.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.border = "1px solid rgba(56,189,248,0.6)";
                    e.currentTarget.style.boxShadow = "0 0 30px rgba(56,189,248,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
                  }}
                >
                  <div style={styles.icon}>{icon}</div>
                  <h3 style={styles.catName}>{cat.name}</h3>
                  <div style={styles.startLabel}>Start →</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategorySelect;

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)",
    fontFamily: "system-ui",
    position: "relative",
    overflow: "hidden",
  },
  glowTop: {
    position: "fixed",
    top: "-200px",
    right: "-100px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(56,189,248,0.10)",
    filter: "blur(120px)",
    pointerEvents: "none",
  },
  glowBottom: {
    position: "fixed",
    bottom: "-200px",
    left: "-100px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(99,102,241,0.08)",
    filter: "blur(120px)",
    pointerEvents: "none",
  },
  inner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 30px 80px",
    position: "relative",
    zIndex: 2,
  },
  backBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#94a3b8",
    padding: "9px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "40px",
  },
  headerWrap: {
    textAlign: "center",
    marginBottom: "50px",
  },
  heading: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.5px",
    margin: 0,
  },
  sub: {
    color: "#64748b",
    marginTop: "12px",
    fontSize: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "24px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "30px 24px",
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    textAlign: "center",
  },
  icon: {
    fontSize: "42px",
    marginBottom: "14px",
    filter: "drop-shadow(0 0 8px rgba(56,189,248,0.5))",
  },
  catName: {
    color: "#e2e8f0",
    fontSize: "17px",
    fontWeight: "600",
    margin: "0 0 12px",
  },
  startLabel: {
    color: "#38bdf8",
    fontSize: "14px",
    fontWeight: "600",
  },
  center: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "3px solid rgba(56,189,248,0.2)",
    borderTop: "3px solid #38bdf8",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};
