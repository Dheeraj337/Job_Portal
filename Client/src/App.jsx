import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import AdminDashboard from './pages/AdminDashboard';
import EmployerJobs from './pages/EmployerJobs';
import JobApplications from './pages/JobApplications';
import ApplyJob from './pages/ApplyJob';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id/apply"
          element={
            <ProtectedRoute>
              <RoleRoute role="jobseeker">
                <ApplyJob />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/jobs"
          element={
            <ProtectedRoute>
              <RoleRoute role="recruiter">
                <EmployerJobs />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/jobs/:jobId/applications"
          element={
            <ProtectedRoute>
              <RoleRoute role="recruiter">
                <JobApplications />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
