import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import NewLandingPage from './pages/NewLandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import QuotaDashboard from './pages/dashboard/QuotaDashboard';
import OfferDetails from './pages/OfferDetails';
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<NewLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plan" element={<QuotaDashboard />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; 