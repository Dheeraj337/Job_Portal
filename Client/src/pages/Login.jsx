import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role.trim().toLowerCase());
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role === 'admin') navigate('/admin');
      else navigate('/jobs');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

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

        <button type="submit" style={styles.button}>Login</button>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
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

export default Login;
