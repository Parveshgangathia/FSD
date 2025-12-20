import { useEffect } from "react";
import useAutoClose from "../hooks/useAutoClose";

function AutoHideAlert({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded">
      <p className="text-green-700 text-sm">{message}</p>
    </div>
  );
}

export default AutoHideAlert;
