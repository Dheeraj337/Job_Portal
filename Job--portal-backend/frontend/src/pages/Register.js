import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("jobseeker");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration successful. Please login.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">

  <form className="auth-box" onSubmit={handleSubmit}>
    <h2>Register</h2>

            <input
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
  <option value="jobseeker">Job Seeker</option>
  <option value="recruiter">Employer</option>
</select>


        <button type="submit">Register</button>
        <p className="auth-switch">Already have an account? <Link to="/">Login</Link></p>

  </form>
</div>

  );
};

export default Register;

