import React, { useEffect, useState } from "react";
import { getAllApplicationsAdmin } from "../api/jobApi";
import API from "../api/axios";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [jobType, setJobType] = useState("");

  const fetchData = async () => {
    try {
      const [uRes, jRes, aRes] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/jobs"),
        getAllApplicationsAdmin()
      ]);
      setUsers(uRes.data);
      setJobs(jRes.data);
      setApplications(aRes.data);
    } catch (err) {
      console.error("Fetch data error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredJobs = jobs.filter(j => j.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", { title, description, location, salary: Number(salary), company, jobType });
      setTitle(""); setDescription(""); setLocation(""); setSalary(""); setCompany(""); setJobType("");
      fetchData();
      alert("Job created successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await API.delete(`/admin/users/${id}`);
      fetchData();
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Delete this job?")) {
      await API.delete(`/admin/jobs/${id}`);
      fetchData();
    }
  };

  return (
    <div className="main-glass-box">
      <h2>Admin Dashboard</h2>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search users or jobs..." 
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="form-section">
        <h3>Create New Job</h3>
        <form onSubmit={createJob} className="admin-form">
          <input placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Job Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
          <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <select value={jobType} onChange={(e) => setJobType(e.target.value)} required>
            <option value="">Select Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
          </select>
          <input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          <button type="submit" className="btn-primary">Create Job</button>
        </form>
      </section>

      <div className="separator"></div>

      <section className="list-section">
        <h3>Users ({filteredUsers.length})</h3>
        <div className="items-list">
          {filteredUsers.map((u) => (
            <div key={u._id} className="user-item">
              <span className="item-details">
                <strong>{u.name}</strong> ({u.email}) — <em>{u.role}</em>
              </span>
              <button className="btn-delete" onClick={() => deleteUser(u._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      <div className="separator"></div>

      <section className="list-section">
        <h3>Active Jobs ({filteredJobs.length})</h3>
        <div className="items-list">
          {filteredJobs.map((j) => (
            <div key={j._id} className="job-item">
              <span className="item-details">
                <strong>{j.title}</strong> — {j.company}
              </span>
              <button className="btn-delete" onClick={() => deleteJob(j._id)}>Delete</button>
            </div>
          ))}
        </div>
      </section>

      <div className="separator"></div>

      <section className="table-section">
        <h3>Applications ({applications.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Job</th>
              <th>Applicant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.job?.title || "N/A"}</td>
                <td>{app.applicant?.name || app.user?.name || "N/A"}</td>
                <td><span className={`status-badge ${app.status}`}>{app.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;