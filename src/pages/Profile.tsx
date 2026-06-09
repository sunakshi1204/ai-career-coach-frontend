import { useEffect, useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    // localStorage se lo
    const savedName = localStorage.getItem("user_name") || "";
    const savedEmail = localStorage.getItem("user_email") || "";
    const savedPhoto = localStorage.getItem("user_photo") || "";
    setName(savedName);
    setEmail(savedEmail);
    setPreview(savedPhoto);
  }, []);

  const handleUpdate = () => {
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    alert("Profile Updated ✅");
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      localStorage.setItem("user_photo", base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 My Profile</h2>
        <p style={styles.sub}>Manage your AI Career account</p>

        <div style={styles.avatarBox}>
          <img
            src={preview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="profile"
            style={styles.avatar}
          />
          <br />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div style={styles.infoBox}>
          <p style={styles.label}>Logged in Email</p>
          <p style={styles.email}>{email || "Not set"}</p>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          style={styles.input}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={styles.input}
        />

        <button onClick={handleUpdate} style={styles.button}>
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #111827, #0b1220)",
    fontFamily: "system-ui",
  },
  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "#e2e8f0",
  },
  title: { fontSize: "26px", fontWeight: "800", color: "#ffffff" },
  sub: { fontSize: "13px", color: "#94a3b8", marginBottom: "20px" },
  avatarBox: { marginBottom: "20px" },
  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #38bdf8",
    boxShadow: "0 0 15px rgba(56,189,248,0.4)",
    marginBottom: "10px",
  },
  infoBox: {
    background: "rgba(255,255,255,0.05)",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "15px",
    border: "1px solid rgba(56,189,248,0.2)",
  },
  label: { fontSize: "12px", color: "#94a3b8" },
  email: { fontSize: "14px", color: "#38bdf8", fontWeight: "600" },
  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(56,189,248,0.25)",
    background: "rgba(255,255,255,0.05)",
    color: "#e2e8f0",
    outline: "none",
    boxSizing: "border-box",
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
  },
};