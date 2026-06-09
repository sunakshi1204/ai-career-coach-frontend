import { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");

  const resetPassword = () => {
    fetch("https://ai-career-coach-backend-ye2g.onrender.com/api/password-reset-confirm/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uid,
        token,
        password
      })
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Enter New Password</h2>

        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={resetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
