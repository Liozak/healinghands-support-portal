
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import PatientForm from './components/PatientForm';
import VolunteerForm from './components/VolunteerForm';
import ContactForm from './components/ContactForm';
import Dashboard from './components/Dashboard';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-500';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                HealingHands
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/patient-support" className={isActive('/patient-support')}>Get Support</Link>
            <Link to="/volunteer-register" className={isActive('/volunteer-register')}>Volunteer</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <Link to="/dashboard" className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition shadow-md">
              Dashboard
            </Link>
          </div>
          {/* Mobile menu button (hidden for simplicity in this draft) */}
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-white border-t border-slate-200 mt-20">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} HealingHands NGO. All rights reserved. Built with precision for healthcare equity.
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patient-support" element={<PatientForm />} />
            <Route path="/volunteer-register" element={<VolunteerForm />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
