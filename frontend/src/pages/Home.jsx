import React from "react";
import { Link } from "react-router-dom";

const Home = ({ error, user }) => {
  return (
    <div className="min-h-[80-vh] bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {error && (
          <div className="mb-6 bg-red-100 text-red-600 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              Authentication System
            </span>

            <h1 className="text-5xl font-bold text-gray-900 mt-6 leading-tight">
              Secure Login &
              <span className="text-blue-600"> User Management</span>
            </h1>

            <p className="text-gray-600 text-lg mt-6">
              A simple authentication application built with React, Express,
              PostgreSQL, JWT, and secure password hashing.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <span>&bull;</span>
                <p className="text-gray-700">JWT Authentication</p>
              </div>

              <div className="flex items-center gap-3">
                <span>&bull;</span>
                <p className="text-gray-700">Protected Routes</p>
              </div>

              <div className="flex items-center gap-3">
                <span>&bull;</span>
                <p className="text-gray-700">Secure Password Storage</p>
              </div>
            </div>
          </div>

          
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {user ? (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                    👋
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800 mt-4">
                    Welcome !
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {user.username}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {user.email}
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-3xl font-bold text-center text-gray-800">
                    Get Started
                  </h2>

                  <p className="text-center text-gray-500 mt-2 mb-8">
                    Login to your account or create a new one.
                  </p>

                  <div className="space-y-4">
                    <Link
                      to="/login"
                      className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="block w-full text-center border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl">JWT</h3>
                <p className="text-sm text-gray-500">Auth</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl">React</h3>
                <p className="text-sm text-gray-500">Frontend</p>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="font-bold text-xl">Postgres</h3>
                <p className="text-sm text-gray-500">Database</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;