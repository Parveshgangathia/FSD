import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import EmptyState from "./EmptyState";

function TaskList() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
