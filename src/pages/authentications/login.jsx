import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from './authServices';
import { AuthContext } from './authContext';
import smartEdgeLogoBlue from '../../assets/images/smartEdgeLogoBlue.png';

const Login = () => {
  const { loadUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await loginUser(formData);
      await loadUser();
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo on top */}
        <div className="flex justify-center mb-4">
          <img src={smartEdgeLogoBlue} alt="SmartEdge Logo" className="h-10" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>
            New user?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
