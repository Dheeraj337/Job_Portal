import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Jobs</h2>
      <button onClick={() => navigate('/my-applications')}>My Applications</button>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #ddd', padding: '16px', marginTop: '12px' }}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <button onClick={() => navigate(`/jobs/${job._id}`)}>View & Apply</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Jobs;
