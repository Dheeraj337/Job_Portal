import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, jobsResponse, applicationsResponse] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/jobs'),
          api.get('/admin/applications'),
        ]);

        setUsers(usersResponse.data || []);
        setJobs(jobsResponse.data || []);
        setApplications(applicationsResponse.data || []);
        setStats({
          users: (usersResponse.data || []).length,
          jobs: (jobsResponse.data || []).length,
          applications: (applicationsResponse.data || []).length,
        });
      } catch (error) {
        console.error('Error fetching admin dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((current) => current.filter((user) => user._id !== id));
      setStats((current) => ({ ...current, users: current.users - 1 }));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const deleteJob = async (id) => {
    try {
      await api.delete(`/admin/jobs/${id}`);
      setJobs((current) => current.filter((job) => job._id !== id));
      setStats((current) => ({ ...current, jobs: current.jobs - 1 }));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete job');
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}><h2>Admin Dashboard</h2><p>Loading dashboard...</p></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        <StatCard label="Users" value={stats.users} />
        <StatCard label="Jobs" value={stats.jobs} />
        <StatCard label="Applications" value={stats.applications} />
      </div>

      <section style={{ marginBottom: '32px' }}>
        <h3>Users</h3>
        {users.length === 0 ? <p>No users found.</p> : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {users.map((user) => (
              <div key={user._id} style={cardStyle}>
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                  <small>{user.role}</small>
                </div>
                <button onClick={() => deleteUser(user._id)} style={dangerButtonStyle}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h3>Jobs</h3>
        {jobs.length === 0 ? <p>No jobs found.</p> : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {jobs.map((job) => (
              <div key={job._id} style={cardStyle}>
                <div>
                  <strong>{job.title}</strong>
                  <p>{job.company}</p>
                  <small>{job.location}</small>
                </div>
                <button onClick={() => deleteJob(job._id)} style={dangerButtonStyle}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (
          <div key={application._id} style={{ border: '1px solid #ddd', padding: '16px', marginTop: '12px' }}>
            <h3>{application.applicant?.name}</h3>
            <p>Email: {application.applicant?.email}</p>
            <p>Job: {application.job?.title}</p>
            <p>Status: {application.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div style={{ border: '1px solid #d1d5db', borderRadius: '12px', padding: '16px', background: '#f9fafb' }}>
    <div style={{ color: '#6b7280', fontSize: '14px' }}>{label}</div>
    <div style={{ fontSize: '28px', fontWeight: '700' }}>{value}</div>
  </div>
);

const cardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  border: '1px solid #ddd',
  padding: '16px',
  borderRadius: '10px',
  background: '#fff',
};

const dangerButtonStyle = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '6px',
  background: '#ef4444',
  color: '#fff',
  cursor: 'pointer',
};

export default AdminDashboard;
