export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}