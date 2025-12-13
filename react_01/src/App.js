import { useState } from "react";
import "./index.css";
import TaskList from "./components/TaskList";
import ProfileCard from "./components/ProfileCard";
import ContactForm from "./components/ContactForm";
import AuthToggle from "./components/AuthToggle";
import Button from "./components/Button";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  function handleAddTask() {
    if (newTask.trim() === "") return;

    setLoading(true);

    // simulate async action
    setTimeout(() => {
      setTasks([...tasks, newTask]);
      setNewTask("");
      setLoading(false);
    }, 500);
  }

  return (
    <div className="p-6 space-y-12 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold text-center">
        React Practice Dashboard
      </h1>

      {/* Auth Toggle */}
      <section>
        <AuthToggle />
      </section>

      {/* Task Manager */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Task Manager</h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            variant="primary"
            onClick={handleAddTask}
            loading={loading}
          >
            Add Task
          </Button>
        </div>

        <TaskList tasks={tasks} />

        {/* Button Variants Demo */}
        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Profile Card */}
      <section>
        <ProfileCard />
      </section>

      {/* Contact Form */}
      <section>
        <ContactForm />
      </section>

    </div>
  );
}

export default App;
