import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  function addTask(text) {
    setTasks(prev => [
      { id: Date.now(), text, completed: false },
      ...prev,
    ]);
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, toggleTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
