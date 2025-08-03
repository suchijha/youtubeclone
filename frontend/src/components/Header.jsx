"use client";
import { useEffect, useState } from "react";
import { Menu, Bell, Upload, Search } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sidbarMethod } from "../State/Slice/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import { loginMethod } from "../State/Slice/IsLogged";
import { videoListMethod } from "../State/Slice/VideoList";

export default function Header() {
  const sideBar = useSelector((state) => state.Sidebar);
  const isLogged = useSelector((state) => state.IsLogged);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3000/isLogin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 && res.data.name) {
        dispatch(loginMethod(true));
      } else {
        dispatch(loginMethod(false));
      }
    } catch (error) {
      dispatch(loginMethod(false));
    }
  }

  const handleSearch = async () => {
    console.log("Searching for:", searchQuery);
    if (!searchQuery) {
      return alert('Fill search input')
    }
    const token = localStorage.getItem('token')
    try {
      const res = await axios.get(`http://localhost:3000/api/video/search?title=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res)
      dispatch(videoListMethod(res.data))
      navigate('/')
    } catch (error) {
      console.log(error.message)
      navigate('/login')
    }
  };

  return (
    <header className="w-full bg-white shadow-md px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button className="cursor-pointer" onClick={() => dispatch(sidbarMethod(!sideBar))}>
          <Menu className="w-6 h-6" />
        </button>
        YOUTUBE
      </div>

      {/* Middle Search */}
      <div className="hidden sm:flex items-center flex-1 max-w-xl mx-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full text-sm focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-200 px-4 py-2 cursor-pointer rounded-r-full hover:bg-gray-300"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Icon */}
        <button
          className="sm:hidden"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
        >
          <Search className="w-5 h-5" />
        </button>

        <Link to="/uploadvideo">
          <Upload className="w-5 h-5 cursor-pointer" />
        </Link>

        <Bell className="w-5 h-5 cursor-pointer" />

        {!isLogged ? (
          <Link to="/login">
            <button className="text-sm bg-blue-600 cursor-pointer text-white px-3 py-1 rounded-xl hover:bg-blue-500">
              Sign In
            </button>
          </Link>
        ) : (
          <UserDropdown userName={localStorage.getItem('name')} />
        )}
      </div>

      {/* Mobile Search Box */}
      {showMobileSearch && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md px-4 py-2 sm:hidden">
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full text-sm focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-200 px-4 py-2 rounded-r-full hover:bg-gray-300"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
