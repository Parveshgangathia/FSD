const users = [
  { name: "Parvesh", role: "Admin", status: "Active" },
  { name: "Aman", role: "User", status: "Inactive" },
  { name: "Riya", role: "User", status: "Active" },
  { name: "Simran", role: "Moderator", status: "Active" },
];

function UserTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Role</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr
              key={i}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    u.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {u.status}
                </span>
              </td>
              <td className="border p-2 space-x-2">
                <button className="text-blue-600 hover:underline">
                  View
                </button>
                <button className="text-green-600 hover:underline">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
