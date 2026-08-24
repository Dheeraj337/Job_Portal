import React, { useState } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      await API.post(`/applications/${jobId}`, formData);
      alert("Applied successfully");
      navigate("/jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Application failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Job</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setResume(e.target.files[0])}
        required
      />

      <button type="submit">Submit Application</button>
    </form>
  );
};

export default ApplyJob;
