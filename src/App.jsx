import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/authContext';
import HomePage from './pages/homePage';
import Login from './pages/login';
import Register from './pages/register';
import Rooms from './pages/rooms';
import Booking from './pages/booking';
import UserDashboard from './pages/dashboard/user';
import AdminDashboard from './pages/dashboard/admin';
import Header from './components/header';
import Footer from './components/footer';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './components/errorBoundary';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Import new payment pages
import Checkout from './pages/checkout';
import Success from './pages/success';
import Cancel from './pages/cancel';

// ProtectedRoute component
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = React.useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

  return children;
}

function App() {
  // Dark mode state
  const [isDark, setIsDark] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );

  // Apply dark mode class to <html> on mount and whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('darkMode', isDark);
  }, [isDark]);

  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          {/* Pass dark mode state to Header */}
          <Header isDark={isDark} setIsDark={setIsDark} />

          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route
                path="/dashboard/user"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
