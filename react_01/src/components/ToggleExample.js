import useToggle from "../hooks/useToggle";

function ToggleExample() {
  const [isOpen, toggle] = useToggle();

  return (
    <div className="p-4 border rounded space-y-3">
      <button
        onClick={toggle}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Toggle
      </button>

      {isOpen && (
        <p className="text-gray-700">
          Now you see me
        </p>
      )}
    </div>
  );
}

export default ToggleExample;
