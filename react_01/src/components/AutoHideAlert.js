import useAutoClose from "../hooks/useAutoClose";

function AutoHideAlert({ message, onClose }) {
  useAutoClose(onClose, 3000);

  return (
    <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
      {message}
    </div>
  );
}

export default AutoHideAlert;
