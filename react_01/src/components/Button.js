function Button({
  children,
  variant = "primary",
  disabled = false,
  loading = false,
  onClick
}) {
  const base =
    "px-4 py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[disabled ? "disabled" : variant]} ${
        loading ? "cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
