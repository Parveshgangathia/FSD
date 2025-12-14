import { useState } from "react";
import Button from "./Button";

function TaskInput({ onAddTask, loading }) {
  const [task, setTask] = useState("");

  function handleSubmit() {
    if (task.trim() === "") return;

    onAddTask(task);
    setTask("");
  }

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Button variant="primary" onClick={handleSubmit} loading={loading}>
        Add Task
      </Button>
    </div>
  );
}

export default TaskInput;
