import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const UserDropdown = ({ userName  }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
 
 function handleLogout(){
    localStorage.setItem('token','');
    location.reload()
 }
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
      >
        <span className="font-medium">{userName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
          <p className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            {userName}
          </p>
          <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
