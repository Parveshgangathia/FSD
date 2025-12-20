function Alert({ type = "info", message }) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-700 border-red-500",
    info: "bg-blue-100 text-blue-700 border-blue-500",
  };

  return (
    <div className={`border-l-4 p-3 rounded ${styles[type]}`}>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default Alert;
