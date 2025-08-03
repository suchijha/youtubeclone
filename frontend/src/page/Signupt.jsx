import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginMethod } from "../State/Slice/IsLogged";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logging, setLogging] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLogging(true);
    const response = await  axios.post('http://localhost:3000/api/auth/signup', {
      name,
      email,
      password,
    });
    if (response.status != "201") {
      alert(response.data.message)
    }
    setLogging(false)
    localStorage.setItem('userId', response.data.user.id)
    localStorage.setItem('name', response.data.user.name)
    localStorage.setItem('email', response.data.user.email)
    localStorage.setItem('token', response.data.token)
    dispatch(loginMethod(true));
    navigate('/')


  };

  return (
    <div className="h-[97vh] w-full flex items-center justify-center  px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="example@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={logging}
            className={`w-full ${logging ? 'bg-purple-400' : 'bg-purple-600'} cursor-pointer text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200`}
          >
            {logging ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
