import React from "react";
import {Router, Route, Routes, useNavigate} from 'react-router-dom'
import TypingEffect from "./TypingEffect";
import UserLogin from "./UserLogin";

const Homepage = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-page-500 flex flex-col items-center justify-center px-4">
      
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[#F2F2F2] mb-4">
          Welcome to <span className="text-[#B3B0C6]">TodoApp</span>
        </h1>
        <p className="text-[#F2F2F2] mb-8">
          Make your day <TypingEffect className="text-blue-300 font-bold !text-lg inline"/>
        </p>
        <div className="flex items-center flex-col gap-4">
          <button
            className="w-1/2 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
            style={{"--button-color":"#B3B0C6"}}
            onClick={()=>navigate('/login')}
          >
            Get Started
          </button>
        </div>
      </div>
      <footer className="absolute bottom-4 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} TodoApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;
