import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (resume) formData.append('resume', resume);

    try {
      await api.post(`/applications/${id}`, formData);
      alert('Application submitted successfully');
      navigate('/my-applications');
    } catch (error) {
      alert(error.response?.data?.message || 'Application failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        <button type="submit" style={{ marginTop: '12px' }}>Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJob;
