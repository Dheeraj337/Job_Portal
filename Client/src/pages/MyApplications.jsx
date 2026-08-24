import { useEffect, useState } from 'react';
import api from '../services/api';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/applications/my');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading applications...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((application) => (
          <div key={application._id} style={{ border: '1px solid #ddd', padding: '16px', marginTop: '12px' }}>
            <h3>{application.job?.title || 'Job'}</h3>
            <p>Status: <strong>{application.status}</strong></p>
            <p>Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyApplications;
