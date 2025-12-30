import { useTasks } from "../context/TaskContext";

function TaskItem({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <div className="flex items-center justify-between
                    p-3 bg-white dark:bg-gray-800 rounded shadow">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.text}
        </span>
      </label>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500"
      >
        ✕
      </button>
    </div>
  );
}

export default TaskItem;
