import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')?.trim().toLowerCase();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav
      style={{
        background: '#222',
        color: '#fff',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <h3 style={{ margin: 0 }}>Job Portal</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!token && <Link to="/" style={linkStyle}>Login</Link>}

        {token && role === 'admin' && <Link to="/admin" style={linkStyle}>Admin</Link>}
        {token && role === 'recruiter' && <Link to="/employer/jobs" style={linkStyle}>My Jobs</Link>}
        {token && role === 'jobseeker' && <Link to="/jobs" style={linkStyle}>Jobs</Link>}
        {token && role === 'jobseeker' && (
          <Link to="/my-applications" style={linkStyle}>My Applications</Link>
        )}

        {token && (
          <button onClick={logout} style={buttonStyle}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const buttonStyle = {
  padding: '8px 12px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  background: '#ef4444',
  color: '#fff',
};

export default Navbar;
