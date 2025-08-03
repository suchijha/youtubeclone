import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { loginMethod } from "../State/Slice/IsLogged";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logging,setLogging] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async(e) => {
    e.preventDefault();
  try {
    setLogging(true)
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email,
      password,
    });
   
    if(response.status!="200"){
      alert(response.data.message)
    }
    setLogging(false)
    localStorage.setItem('userId',response.data.user.id)
    localStorage.setItem('name',response.data.user.name)
    localStorage.setItem('email',response.data.user.email)
   
    localStorage.setItem('token',response.data.token)
     dispatch(loginMethod(true));
    navigate('/')
  } catch (error) {
    setLogging(false)
    alert(error.response?.data?.message || error.message)
    console.error("Login Failed:", error.response?.data?.message || error.message);
  }
  };

  return (
    <div className="h-[97vh] w-full flex items-center justify-center  px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

        
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

        
          <button
            type="submit"
            disabled={logging}
            className={`w-full ${logging?'bg-purple-400':'bg-purple-600'} cursor-pointer text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200`}
          >
            {logging?'Loading...':'Login'} 
          </button>
        </form>

       
        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
