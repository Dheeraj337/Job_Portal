import React, { useEffect, useState } from "react";
import API from "../api/axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/my");
        setApplications(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;

  return (
    <div>
      <h2 style={{ color: "white", textAlign: "center" }}>My Registered Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="application-card">

            <h3>{app.job?.title}</h3>
            <p>Status: <b>{app.status}</b></p>
            <p>Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyApplications;
