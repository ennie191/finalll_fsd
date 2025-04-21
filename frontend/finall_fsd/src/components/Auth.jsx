import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student', // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send login request to the backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.user.role === 'mentor') {
        navigate('/mentor/dashboard');
      } else if (data.user.role === 'student') {
        navigate('/student/dashboard');
      } else if (data.user.role === 'collaborator') {
        navigate('/collaborator/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <div className="max-w-md w-full space-y-8 p-10 rounded-2xl" 
        style={{ 
          background: '#111827',
          boxShadow: '10px 10px 20px #0a0f1a, -10px -10px 20px #1a2035, inset 0px 0px 15px rgba(0, 200, 255, 0.05)',
          border: '1px solid rgba(0, 200, 255, 0.1)'
        }}>
        <div>
          <h1 className="text-center text-4xl font-bold tracking-wider" 
            style={{ 
              color: '#06b6d4', 
              textShadow: '0 0 15px rgba(6, 182, 212, 0.5)',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '0.05em'
            }}>
            
          </h1>
          <h2 className="mt-4 text-center text-2xl font-semibold text-gray-100">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-cyan-400 text-sm">Enter your credentials to continue</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="rounded-xl p-4" style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.3)' }}>
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-400">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyan-300 mb-1 ml-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-12 pr-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ 
                    background: '#1e293b',
                    boxShadow: 'inset 4px 4px 8px #16202e, inset -4px -4px 8px #263248',
                    border: '1px solid rgba(0, 200, 255, 0.1)'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-cyan-300 mb-1 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-cyan-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-12 pr-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ 
                    background: '#1e293b',
                    boxShadow: 'inset 4px 4px 8px #16202e, inset -4px -4px 8px #263248',
                    border: '1px solid rgba(0, 200, 255, 0.1)'
                  }}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-cyan-300 mb-1 ml-1">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-xl text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                style={{ 
                  background: '#1e293b',
                  boxShadow: 'inset 4px 4px 8px #16202e, inset -4px -4px 8px #263248',
                  border: '1px solid rgba(0, 200, 255, 0.1)'
                }}
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="collaborator">Collaborator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-xl text-white transition-all duration-300 ease-in-out"
              style={{ 
                background: 'linear-gradient(135deg, #0891b2 0%, #155e75 100%)',
                boxShadow: loading ? 'none' : '4px 4px 10px #0a0f1a, -4px -4px 10px #1a2035, 0 0 10px rgba(6, 182, 212, 0.5)',
                border: '1px solid rgba(8, 145, 178, 0.5)',
                transform: loading ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUser className="h-5 w-5 text-cyan-100 group-hover:text-white" />
              </span>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        {/* Extra Design Element - Glowing lines */}
        <div className="relative h-0.5 w-full mt-8 rounded-full overflow-hidden" 
          style={{ 
            background: '#0f172a',
            boxShadow: '0 0 5px rgba(6, 182, 212, 0.5)'
          }}>
          <div className="absolute h-full left-0 top-0 animate-pulse" 
            style={{ 
              width: '30%', 
              background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
              animation: 'pulse 2s infinite'
            }}>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-400">
          Need help? <a href="#" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">Contact support</a>
        </p>
      </div>
    </div>
  );
};

export default Auth;