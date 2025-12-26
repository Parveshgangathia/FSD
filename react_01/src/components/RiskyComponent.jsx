import { useState } from "react";

function RiskyComponent() {
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error("Component crashed intentionally");
  }

  return (
    <div className="p-4 border rounded">
      <p className="mb-3">Click the button to crash this component.</p>
      <button
        onClick={() => setCrash(true)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Crash Component
      </button>
    </div>
  );
}

export default RiskyComponent;
