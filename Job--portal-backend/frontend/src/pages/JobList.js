import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  return (
    <div>
      {jobs.map((job) => (
        <div key={job._id}>
          <Link to={`/jobs/${job._id}`}>
            <h3>{job.title}</h3>
          </Link>
          <p>{job.company}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
