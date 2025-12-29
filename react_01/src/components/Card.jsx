import { useTheme } from "../context/ThemeContext";

function Card({ title, children }) {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 rounded-xl shadow transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-white border border-gray-700"
          : "bg-white text-gray-900 border border-gray-200"
      }`}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-3">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Card;
