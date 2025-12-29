import { useTheme } from "../context/ThemeContext";

function PageContainer({ children }) {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-white text-black"
      }`}
    >
      {children}
    </div>
  );
}

export default PageContainer;
