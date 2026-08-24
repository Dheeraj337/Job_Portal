import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
console.log("Navbar loaded");

  return (
    <div
      style={{
        background: "#222",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3>Job Portal</h3>

      <div>
        {/* Show Login if not logged in */}
        {!token && (
          <Link to="/" style={linkStyle}>
            Login
          </Link>
        )}

        {/* Admin */}
        {token && role === "admin" && (
          <Link to="/admin" style={linkStyle}>
            Admin
          </Link>
        )}

        {/* Recruiter (Employer) */}
        {token && role === "recruiter" && (
          <Link to="/employer/jobs" style={linkStyle}>
            My Jobs
          </Link>
        )}

        {/* Jobseeker */}
        {token && role === "jobseeker" && (
          <Link to="/jobs" style={linkStyle}>
            Jobs
          </Link>
        )}

        {/* Logout button */}
        {token && (
          <button onClick={logout} style={btnStyle}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

const linkStyle = {
  color: "white",
  marginRight: "15px",
  textDecoration: "none",
};

const btnStyle = {
  padding: "5px 10px",
  cursor: "pointer",
};

export default Navbar;
