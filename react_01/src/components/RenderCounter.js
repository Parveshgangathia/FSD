import { useRef, useState } from "react";

function RenderCounter() {
  const renders = useRef(0);
  const [count, setCount] = useState(0);

  renders.current++;

  return (
    <div className="p-4 border rounded space-y-2">
      <p className="font-medium">Renders: {renders.current}</p>
      <p>Count: {count}</p>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-3 py-1 bg-gray-800 text-white rounded"
      >
        +
      </button>
    </div>
  );
}

export default RenderCounter;
