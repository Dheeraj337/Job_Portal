import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const EmployerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/jobs/employer")
      .then((res) => setJobs(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Posted Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id} style={card}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>

          <button onClick={() => navigate(`/job-applications/${job._id}`)}>
            View Applications
          </button>
        </div>
      ))}
    </div>
  );
};

const card = {
  border: "1px solid #ddd",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "5px",
};

export default EmployerJobs;
