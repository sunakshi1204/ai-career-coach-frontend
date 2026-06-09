import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match ");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://127.0.0.1:8000/register/", {
        email: form.email,
        password: form.password,
      });

      alert(res.data.message);

// localStorage mein save karo
localStorage.setItem("user_email", form.email);
localStorage.setItem("user_name", form.name);

setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || "Registration failed ");
      } else {
        alert("Server not responding ");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.sub}>Join AI Career Coach</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account? <span>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)",
    fontFamily: "system-ui",
  },

  card: {
    width: "380px",
    padding: "35px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "#e2e8f0",
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "1px",
  },

  sub: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(56, 189, 248, 0.25)",
    background: "rgba(255,255,255,0.05)",
    color: "#e2e8f0",
    outline: "none",
    transition: "0.3s",
  },

  button: {
    width: "100%",
    marginTop: "18px",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#38bdf8",
    color: "#0f172a",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
  },

  footer: {
    marginTop: "15px",
    fontSize: "13px",
    color: "#94a3b8",
  },

  link: {
    color: "#38bdf8",
    cursor: "pointer",
    marginLeft: "5px",
  },
};