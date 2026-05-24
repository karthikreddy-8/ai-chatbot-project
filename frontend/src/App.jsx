import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './hooks/useAuth';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ProjectsPage from './pages/ProjectsPage';
import LibraryPage from './pages/LibraryPage';

/**
 * Protected Route
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">

          <div className="w-14 h-14 rounded-full border-[3px] border-transparent border-t-white border-r-gray-500 animate-spin" />

          <p className="text-gray-400 text-sm tracking-wide">
            Loading AI CHATBOT...
          </p>

        </div>
      </div>
    );
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * Public Route
 */
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-14 h-14 rounded-full border-[3px] border-transparent border-t-white border-r-gray-500 animate-spin" />
      </div>
    );
  }

  // Already logged in
  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return children;
}

/**
 * Main Routes
 */
function AppRoutes() {
  const { loading } = useAuth();

  // Global Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">

        <div className="flex flex-col items-center gap-6">

          {/* AI Logo */}
          <div className="relative">

            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-black text-2xl font-bold">
                AI
              </span>
            </div>

          </div>

          <h1 className="text-white text-2xl font-bold tracking-widest">
            AI CHATBOT
          </h1>

        </div>

      </div>
    );
  }

  return (
    <Routes>

      {/* Landing Page */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Login Page */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      {/* Chat Page */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      {/* Projects Page */}
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />

      {/* Library Page */}
      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <LibraryPage />
          </ProtectedRoute>
        }
      />

      {/* Invalid Routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

/**
 * Main App
 */
export default function App() {
  return (
    <ThemeProvider>

      <AuthProvider>

        <Router>

          <AppRoutes />

        </Router>

      </AuthProvider>

    </ThemeProvider>
  );
}