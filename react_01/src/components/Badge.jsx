function Badge({ status }) {
  const styles = {
    admin: "bg-purple-100 text-purple-700",
    user: "bg-blue-100 text-blue-700",
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

export default Badge;
