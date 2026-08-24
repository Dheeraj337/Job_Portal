import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import JobDetails from "./pages/JobDetails";
import MyApplications from "./pages/MyApplications";
import "./styles/global.css";
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
  path="/my-applications"
  element={
    <ProtectedRoute>
      <MyApplications />
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
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;