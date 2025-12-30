import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskInput() {
  const [text, setText] = useState("");
  const { addTask } = useTasks();

  function handleAdd() {
    if (!text.trim()) return;
    addTask(text);
    setText("");
  }

  return (
    <div className="flex gap-2">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a task..."
        className="flex-1 p-2 border rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}

export default TaskInput;
