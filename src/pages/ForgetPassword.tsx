import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendResetLink = () => {
    fetch("http://127.0.0.1:8000/api/forgot-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => alert(data.message))
      .catch(err => alert("Error sending email"));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Forgot Password</h2>
        <p>Enter your email to reset password</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={sendResetLink}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;