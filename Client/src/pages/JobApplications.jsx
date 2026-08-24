import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get(`/applications/job/${jobId}`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching job applications:', error);
      }
    };

    fetchApplications();
  }, [jobId]);

  const updateStatus = async (applicationId, status) => {
    try {
      await api.patch(`/applications/${applicationId}/status`, { status });
      setApplications((current) =>
        current.map((app) =>
          app._id === applicationId ? { ...app, status } : app
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Job Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((application) => (
          <div key={application._id} style={{ border: '1px solid #ddd', padding: '16px', marginTop: '12px' }}>
            <p><strong>Name:</strong> {application.applicant?.name}</p>
            <p><strong>Email:</strong> {application.applicant?.email}</p>
            <p><strong>Status:</strong> {application.status}</p>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button onClick={() => updateStatus(application._id, 'shortlisted')}>Shortlist</button>
              <button onClick={() => updateStatus(application._id, 'rejected')}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobApplications;
