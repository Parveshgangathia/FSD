import { useEffect } from "react";

function NotificationsPanel({ notifications, removeNotification }) {
  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-4 right-4 w-80 bg-white shadow-xl rounded-xl p-4 space-y-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-3 rounded flex justify-between items-start
            ${
              n.type === "success"
                ? "bg-green-100 text-green-700"
                : n.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          <p className="text-sm">{n.message}</p>

          <button
            onClick={() => removeNotification(n.id)}
            className="ml-2 text-sm font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default NotificationsPanel;
