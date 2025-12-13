function TaskList({ tasks }) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-3">My Tasks</h2>

      {/* Conditional Rendering */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="p-3 border rounded bg-gray-100 hover:bg-gray-200 transition"
            >
              {task}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
