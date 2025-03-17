import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import smartEdgeLogoBlue from "../../assets/images/smartEdgeLogoBlue.png"; // Adjust path if needed

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simulated signup handler (replace with your own auth logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, consider signup successful if all fields are filled.
    if (name && email && password) {
      // In a real app, you would send a request to your backend here.
      navigate("/dashboard"); // Redirect to a dashboard or home page after signup.
    } else {
      setError("Please fill all the fields");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        {/* Logo and Heading */}
        <div className="flex flex-col items-center">
          <img src={smartEdgeLogoBlue} alt="Smart Edge Logo" className=" h-10 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center text-sm">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
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
              Sign Up
            </button>
          </div>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
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

export default Signup;
