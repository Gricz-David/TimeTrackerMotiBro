import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  //Clearing localStorage for testing purpose
  // localStorage.clear();
  // Check if a username exists in local storage when the component loads
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      // If a username exists, redirect to the main page
      navigate("/main");
    }
  }, [navigate]);

  // Save username to local storage
  const handleSave = () => {
    if (username.trim() !== "") {
      localStorage.setItem("username", username);
      navigate("/main");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-5 pb-2 px-1 flex flex-col">
      <Header />
      <div className="flex-2 bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mt-4 sm:mt-5 md:mt-6">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Enter your username:
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSave}
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Username
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
