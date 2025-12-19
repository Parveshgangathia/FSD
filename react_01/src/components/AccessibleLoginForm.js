import { useState } from "react";

function AccessibleLoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    alert("Login successful");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded space-y-4 max-w-md"
    >
      <h2 className="text-xl font-semibold">Login</h2>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-help email-error"
          className={`w-full p-2 border rounded
            focus:outline-none focus:ring-2
            ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}
          `}
        />

        <p id="email-help" className="text-xs text-gray-500">
          We’ll never share your email.
        </p>

        {error && (
          <p id="email-error" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!email}
        className="px-4 py-2 bg-blue-600 text-white rounded
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>
    </form>
  );
}

export default AccessibleLoginForm;
