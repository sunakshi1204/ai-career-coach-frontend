import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); // Console mein dekho backend kya bhej raha hai
        alert(data.message);
        if (data.message === "Login successful") {
          navigate("/dashboard");
        }
      })
      .catch(err => {
        console.log(err);
        alert("Login failed");
      });
  };

  const sendLink = () => {
    fetch("http://127.0.0.1:8000/api/password-reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        navigate("/reset-sent");
      })
      .catch(err => {
        console.log(err);
        alert("Error sending reset link");
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Login </h2>
        <p>Welcome back 👋</p>

        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <p className="forgot-text">
          <span onClick={sendLink}>
            Forgot Password?
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;