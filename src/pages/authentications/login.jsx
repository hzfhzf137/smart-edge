import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import smartEdgeLogoBlue from "../../assets/images/smartEdgeLogoBlue.png"; // Adjust path as needed

const Login = () => {
  // Local state for form values and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  // Navigation hook to redirect on successful login
  const navigate = useNavigate();

  // Simulated login handler (replace with your own auth logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    // For demonstration, use a simple condition.
    if (email === "test@example.com" && password === "password") {
      // Successful login; redirect (for example, to a dashboard)
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center">
          <img src={smartEdgeLogoBlue} alt="Smart Edge Logo" className=" h-10 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Login to Smart Edge</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </Link>
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Create an account
          </Link>
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center text-sm mt-4">
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
