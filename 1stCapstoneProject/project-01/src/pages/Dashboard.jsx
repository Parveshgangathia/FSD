import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Card from "../components/Card";
import Button from "../components/Button";
import Loader from "../components/Loader";

export default function Dashboard() {
  // 1. Use our custom hook for persistence
  const [tasks, setTasks] = useLocalStorage("my-tasks", []);
  
  // 2. Local state for inputs and loading
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 3. Simulate a "fake" API load (1 second delay)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // 4. Handlers
  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask = { 
      id: Date.now(), 
      text: inputValue, 
      completed: false 
    };
    
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // 5. Filter tasks based on search (Derived State)
  const filteredTasks = tasks.filter(t => 
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        My Tasks
      </h1>

      {/* Input Section */}
      <Card className="flex flex-col gap-4">
        <form onSubmit={addTask} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add a new task..."
            className="flex-1 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 transition-colors"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
        
        <input 
          type="text" 
          placeholder="Search tasks..." 
          className="p-2 border rounded text-sm outline-none focus:border-blue-500 dark:bg-slate-700 dark:text-white dark:border-slate-600 transition-colors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Card>

      {/* Task List Section */}
      <div className="space-y-3">
        {isLoading ? (
          <Loader />
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            {search ? "No matching tasks found." : "No tasks yet. Add one above!"}
          </p>
        ) : (
          filteredTasks.map(task => (
            <Card key={task.id} className="flex justify-between items-center !p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 overflow-hidden">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 cursor-pointer accent-blue-600"
                />
                <span className={`truncate dark:text-white ${task.completed ? "line-through text-gray-400" : ""}`}>
                  {task.text}
                </span>
              </div>
              <Button 
                variant="danger" 
                onClick={() => deleteTask(task.id)} 
                className="text-sm px-3 py-1 ml-2 shrink-0"
              >
                Delete
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}