import React from "react";

const Header = ({ username }) => {
  return (
    <header className="bg-blue-500 text-white py-1 px-2 sm:px-3 md:px-4 rounded-b-lg shadow-lg w-full fixed top-0 left-0 z-10">
      {/* Conditionally center the app name if no username exists */}
      <div
        className={`${
          !username
            ? "items-center sm:space-x-4 w-full"
            : "flex flex-col sm:flex-row items-center justify-between sm:space-x-4 w-full"
        }`}
      >
        <h1
          className={`text-3xl sm:text-4xl font-bold px-4 sm:px-6 ${
            !username ? "text-center" : "sm:text-left flex-1"
          }`}
        >
          Time Tracker
        </h1>

        {/* Show username only on medium and larger screens */}
        {username && (
          <p className="text-lg sm:text-xl text-center sm:text-right flex-1 mt-2 sm:mt-0 px-4 sm:px-6 hidden sm:block">
            Welcome, {username}!
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
