import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    API.get(`/applications/job/${jobId}`)
      .then((res) => setApplications(res.data))
      .catch(console.error);
  }, [jobId]);

  const updateStatus = async (id, status) => {
    await API.patch(`/applications/${id}/status`, { status });

    setApplications((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, status } : a
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Applications</h2>

      {applications.map((app) => (
        <div key={app._id} style={card}>
          <p><b>Name:</b> {app.applicant.name}</p>
          <p><b>Email:</b> {app.applicant.email}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={badge(app.status)}>{app.status}</span>
          </p>

          <a
            href={`http://localhost:5000/${app.resume}`}
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>

          <div style={{ marginTop: "10px" }}>
            <button onClick={() => updateStatus(app._id, "accepted")}>
              Accept
            </button>
            <button onClick={() => updateStatus(app._id, "rejected")}>
              Reject
            </button>
          </div>
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

const badge = (status) => ({
  padding: "3px 8px",
  color: "#fff",
  borderRadius: "4px",
  background:
    status === "accepted"
      ? "green"
      : status === "rejected"
      ? "red"
      : "gray",
});

export default JobApplications;
