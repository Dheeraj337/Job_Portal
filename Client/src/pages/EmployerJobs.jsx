import { useEffect, useState } from 'react';
import api from '../services/api';

const EmployerJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [company, setCompany] = useState('');
  const [jobType, setJobType] = useState('Full-Time');

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch {
      return {};
    }
  })();

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      const myJobs = response.data.filter((job) => {
        const createdById = typeof job.createdBy === 'string' ? job.createdBy : job.createdBy?._id;
        return createdById === currentUser._id;
      });
      setJobs(myJobs);
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();

    try {
      await api.post('/jobs', {
        title,
        description,
        location,
        salary: Number(salary),
        company,
        jobType,
      });

      setTitle('');
      setDescription('');
      setLocation('');
      setSalary('');
      setCompany('');
      setJobType('Full-Time');
      fetchJobs();
      alert('Job created successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create job');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Jobs</h2>

      <form onSubmit={handleCreateJob} style={{ marginBottom: '20px' }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" style={inputStyle} required />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" style={inputStyle} required />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" style={inputStyle} required />
        <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" type="number" style={inputStyle} required />
        <select value={jobType} onChange={(e) => setJobType(e.target.value)} style={inputStyle}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ ...inputStyle, minHeight: '80px' }} required />
        <button type="submit">Create Job</button>
      </form>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: '1px solid #ddd', padding: '16px', marginTop: '12px' }}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.jobType}</p>
            <button onClick={() => window.location.href = `/employer/jobs/${job._id}/applications`}>
              View Applications
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const inputStyle = {
  display: 'block',
  width: '100%',
  marginBottom: '10px',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
};

export default EmployerJobs;
