
"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // State for error messages
  const router = useRouter();

  const handleSubmit = async () => {
    setError("");  // Reset error before making the request

    try {
      const response = await axios.post("/api/signin", { email, password });

      if (response.data.message === "Login successful") {
        router.push("/landingpage");
      } else {
        setError(response.data.error || "An unexpected error occurred");  // Handle response errors
      }
    } catch (error) {
      // If there's a network error or any other issues
      setError("An error occurred while connecting to the server.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign In</h2>
        
        {/* Error message display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-500 border border-red-300 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          {/* Email Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <Mail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent focus:outline-none text-gray-700"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-2">
            <Lock className="text-gray-500 mr-3" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-transparent focus:outline-none text-gray-700"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 text-center text-gray-500">
          <p>Dont have an account? <a href="/signup" className="text-blue-500 hover:text-blue-600">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
