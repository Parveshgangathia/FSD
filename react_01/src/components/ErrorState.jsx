function ErrorState({ title, message, actionLabel, onAction }) {
  return (
    <div className="border border-dashed rounded-xl bg-gray-50 p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{message}</p>

      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorState;
