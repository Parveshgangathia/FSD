import { useState } from "react";

function AuthToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleToggle() {
    setIsLoggedIn(!isLoggedIn);
  }

  return (
    <div className="p-6 border rounded-lg text-center space-y-4">
      {/* Conditional Message */}
      {isLoggedIn ? (
        <h2 className="text-xl font-bold text-green-600">
          Welcome, Parvesh
        </h2>
      ) : (
        <h2 className="text-xl font-bold text-gray-600">
          Please log in
        </h2>
      )}

      {/* Conditional Button */}
      <button
        onClick={handleToggle}
        className={`px-5 py-2 rounded font-medium transition ${
          isLoggedIn
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default AuthToggle;
