function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  textarea = false
}) {
  const baseClasses =
    "w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2";

  const normalState = "border-gray-300 focus:ring-blue-500";
  const errorState = "border-red-500 focus:ring-red-500";
  const disabledState = "bg-gray-100 text-gray-500 cursor-not-allowed";

  const inputClasses = `
    ${baseClasses}
    ${error ? errorState : normalState}
    ${disabled ? disabledState : ""}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {textarea ? (
        <textarea
          rows="4"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
        />
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
