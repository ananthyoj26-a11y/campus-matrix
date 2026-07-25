import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { I18nProvider } from './contexts/I18nContext';

import Layout from './components/Layout';

// Eagerly load landing/auth (critical path)
import LandingPage from './features/landing/LandingPage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import VerifyOTP from './features/auth/VerifyOTP';

// Lazy load all protected feature modules for code splitting
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const CareerRoadmap = lazy(() => import('./features/career-roadmap/CareerRoadmap'));
const CodingHub = lazy(() => import('./features/coding-hub/CodingHub'));
const ProblemView = lazy(() => import('./features/coding-hub/ProblemView'));
const MockInterview = lazy(() => import('./features/mock-interview/MockInterview'));
const Careers = lazy(() => import('./features/careers/Careers'));
const Hackathons = lazy(() => import('./features/hackathons/Hackathons'));
const Guilds = lazy(() => import('./features/guilds/Guilds'));
const Profile = lazy(() => import('./features/profile/Profile'));
const Analytics = lazy(() => import('./features/analytics/Analytics'));
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'));
const Leaderboard = lazy(() => import('./features/gamification/Leaderboard'));
const CollegeListPage = lazy(() => import('./features/colleges/CollegeList'));
const CollegeProfile = lazy(() => import('./features/colleges/CollegeProfile'));
const EventsPage = lazy(() => import('./features/events/EventsPage'));
const ATSChecker = lazy(() => import('./features/tools/ATSChecker'));
const OnboardingWizard = lazy(() => import('./features/onboarding/OnboardingWizard'));
const ForumPage = lazy(() => import('./features/forum/ForumPage'));
const AIMentorPage = lazy(() => import('./features/ai-mentor/AIMentorPage'));
const EmergencyPage = lazy(() => import('./features/emergency/EmergencyPage'));
const CampusMapPage = lazy(() => import('./features/campus-map/CampusMapPage'));
const WeeklyDigestPage = lazy(() => import('./features/weekly-digest/WeeklyDigestPage'));

// Shared loading spinner
const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '60vh',
  }}>
    <div style={{
      width: 40, height: 40, border: '3px solid var(--border)',
      borderTopColor: 'var(--accent)', borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }} />
  </div>
);

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: 'var(--bg-primary)'
      }}>
        <div style={{
          width: 40, height: 40, border: '3px solid var(--border)',
          borderTopColor: 'var(--accent)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/colleges" element={<Suspense fallback={<PageLoader />}><CollegeListPage /></Suspense>} />
        <Route path="/colleges/:id" element={<Suspense fallback={<PageLoader />}><CollegeProfile /></Suspense>} />

        {/* Onboarding (authenticated but no layout) */}
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingWizard /></ProtectedRoute>} />

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

        {/* V2 Protected Routes */}
        <Route path="/forum" element={<ProtectedRoute><Layout><ForumPage /></Layout></ProtectedRoute>} />
        <Route path="/ai-mentor" element={<ProtectedRoute><Layout><AIMentorPage /></Layout></ProtectedRoute>} />
        <Route path="/emergency" element={<ProtectedRoute><Layout><EmergencyPage /></Layout></ProtectedRoute>} />
        <Route path="/campus-map" element={<ProtectedRoute><Layout><CampusMapPage /></Layout></ProtectedRoute>} />
        <Route path="/weekly-digest" element={<ProtectedRoute><Layout><WeeklyDigestPage /></Layout></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
