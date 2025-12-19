import { useRef, useEffect } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="p-4 space-y-3 border rounded">
      <input
        ref={inputRef}
        className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="I auto-focus on load"
      />

      <button
        onClick={() => inputRef.current.focus()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Focus Input
      </button>
    </div>
  );
}

export default FocusInput;
