import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role')?.trim().toLowerCase();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    const checkApplication = async () => {
      if (role !== 'jobseeker') return;

      try {
        const response = await api.get('/applications/my');
        const alreadyApplied = response.data.some(
          (application) => application.job?._id === id || application.job === id
        );
        setApplied(alreadyApplied);
      } catch (error) {
        console.error('Error checking application status:', error);
      }
    };

    fetchJob();
    checkApplication();
  }, [id, role]);

  const handleApply = () => {
    if (role !== 'jobseeker') {
      alert('Only job seekers can apply.');
      return;
    }

    if (applied) {
      alert('You have already applied for this job.');
      return;
    }

    navigate(`/jobs/${id}/apply`);
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p>{job.description}</p>

      {job.createdBy && (
        <p><strong>Posted by:</strong> {job.createdBy.name || 'Recruiter'}</p>
      )}

      {role === 'jobseeker' && (
        <button onClick={handleApply} disabled={applied}>
          {applied ? 'Already Applied' : 'Apply for Job'}
        </button>
      )}
    </div>
  );
};

export default JobDetails;
