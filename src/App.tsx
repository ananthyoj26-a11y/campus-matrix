import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import LandingPage from './features/landing/LandingPage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import VerifyOTP from './features/auth/VerifyOTP';
import Dashboard from './features/dashboard/Dashboard';
import CareerRoadmap from './features/career-roadmap/CareerRoadmap';
import CodingHub from './features/coding-hub/CodingHub';
import ProblemView from './features/coding-hub/ProblemView';
import MockInterview from './features/mock-interview/MockInterview';
import Careers from './features/careers/Careers';
import Hackathons from './features/hackathons/Hackathons';
import Guilds from './features/guilds/Guilds';
import Profile from './features/profile/Profile';
import Analytics from './features/analytics/Analytics';
import AdminDashboard from './features/admin/AdminDashboard';
import Leaderboard from './features/gamification/Leaderboard';
import CollegeListPage from './features/colleges/CollegeList';
import CollegeProfile from './features/colleges/CollegeProfile';
import EventsPage from './features/events/EventsPage';
import ATSChecker from './features/tools/ATSChecker';

import Layout from './components/Layout';

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/colleges" element={<CollegeListPage />} />
      <Route path="/colleges/:id" element={<CollegeProfile />} />

      {/* Protected authenticated routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/career-roadmap" element={<ProtectedRoute><Layout><CareerRoadmap /></Layout></ProtectedRoute>} />
      <Route path="/coding-hub" element={<ProtectedRoute><Layout><CodingHub /></Layout></ProtectedRoute>} />
      <Route path="/coding-hub/:problemId" element={<ProtectedRoute><Layout><ProblemView /></Layout></ProtectedRoute>} />
      <Route path="/mock-interview" element={<ProtectedRoute><Layout><MockInterview /></Layout></ProtectedRoute>} />
      <Route path="/careers" element={<ProtectedRoute><Layout><Careers /></Layout></ProtectedRoute>} />
      <Route path="/events" element={<ProtectedRoute><Layout><EventsPage /></Layout></ProtectedRoute>} />
      <Route path="/hackathons" element={<ProtectedRoute><Layout><Hackathons /></Layout></ProtectedRoute>} />
      <Route path="/guilds" element={<ProtectedRoute><Layout><Guilds /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><Layout><Leaderboard /></Layout></ProtectedRoute>} />
      <Route path="/tools/ats-checker" element={<ProtectedRoute><Layout><ATSChecker /></Layout></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}
