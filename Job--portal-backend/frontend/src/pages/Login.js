import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

      //  SAVE ROLE CORRECTLY
      localStorage.setItem(
        "role",
        res.data.user.role.trim().toLowerCase()
      );

      //  NAVIGATION
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
  <form className="auth-box" onSubmit={handleSubmit}>
    <h2>Login</h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button type="submit">Login</button>

    <p>
      Don’t have an account? <Link to="/register">Register</Link>
    </p>
  </form>
</div>

  );
};

export default Login;
