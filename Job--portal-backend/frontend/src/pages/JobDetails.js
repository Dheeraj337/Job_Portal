import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Safe role handling
  const rawRole = localStorage.getItem("role");
  const role = rawRole ? rawRole.trim().toLowerCase() : null;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Fetch job error:", error);
      }
    };

    const checkIfApplied = async () => {
      try {
        const res = await API.get("/applications/my");

        const alreadyApplied = res.data.some(
          (application) =>
            application.job === id ||
            application.job?._id === id
        );

        setApplied(alreadyApplied);
      } catch (error) {
        console.error("Check applied error:", error);
      }
    };

    fetchJob();

    // ✅ Only jobseekers should check applications
    if (role === "jobseeker") {
      checkIfApplied();
    }

  }, [id, role]);

  const applyJob = async () => {
    // Extra safety check
    if (role !== "jobseeker") {
      alert("Only jobseekers can apply for jobs.");
      return;
    }

    if (applied) {
      alert("⚠️ You have already applied for this job");
      return;
    }

    try {
      setLoading(true);

      await API.post(`/applications/${id}`);

      alert("✅ Applied successfully");
      setApplied(true);

    } catch (error) {
      console.error("Apply job error:", error);

      if (error.response) {
        if (
          error.response.status === 409 ||
          error.response.data?.message === "Already applied"
        ) {
          alert("⚠️ You have already applied for this job");
          setApplied(true);
        } else {
          alert(error.response.data?.message || "Application failed ❌");
        }
      } else {
        alert("❌ Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="job-details-container">
      <div className="job-details-card">
        <h1>{job.title}</h1>

        <div className="job-info">
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
        </div>

        {/* ✅ Apply Button Visible Only For Jobseekers */}
        {role === "jobseeker" && (
          <button
            className="apply-btn"
            onClick={applyJob}
            disabled={applied || loading}
          >
            {loading
              ? "Applying..."
              : applied
              ? "Already Applied ✅"
              : "Apply for Job"}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
