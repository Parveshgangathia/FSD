function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-purple-700">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Only users with <strong>admin</strong> role can see this page.
      </p>
    </div>
  );
}

export default AdminDashboard;
