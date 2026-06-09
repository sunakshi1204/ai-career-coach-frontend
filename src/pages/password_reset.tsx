import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendLink = () => {
    fetch("http://127.0.0.1:8000/api/password-reset/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={sendLink}>Send Reset Link</button>
      </div>
    </div>
  );
}

export default ForgotPassword;