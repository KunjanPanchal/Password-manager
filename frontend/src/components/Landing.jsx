import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        Secure Your Passwords
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-xl">
        A simple and secure password manager built with React, Vite, MongoDB, and Tailwind CSS.
      </p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold transition">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-800 rounded-xl text-lg font-semibold transition">
            Register
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
