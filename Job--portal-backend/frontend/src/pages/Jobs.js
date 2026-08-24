import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

 return (
  // <div className="jobs-page">
    <div className="jobs-container">
      <h2>Available Jobs</h2>

      <button
        className="job-btn"
        onClick={() => navigate("/my-applications")}
      >
        My Applications
      </button>

      {jobs.map((job) => (
        <div className="job-card" key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>

          <button
            className="job-btn"
            onClick={() => navigate(`/jobs/${job._id}`)}
          >
            View & Apply
          </button>
        </div>
      ))}
    </div>
  // </div>
);



};

export default Jobs;
