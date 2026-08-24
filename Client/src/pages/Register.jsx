import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', { name, email, password, role });
      alert('Registration successful. Please login.');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Employer</option>
        </select>

        <button type="submit" style={styles.button}>Register</button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f3f4f6',
  },
  form: {
    background: '#fff',
    padding: '24px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '6px',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Register;
