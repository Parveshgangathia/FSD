import { useState, useEffect } from "react";

import AuthToggle from "./AuthToggle";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import ProfileCard from "./ProfileCard";
import ContactForm from "./ContactForm";
import Button from "./Button";
import Posts from "./Posts";
import TimerCounter from "./TimerCounter";
import AutoHideAlert from "./AutoHideAlert";

function Dashboard() {
  // Task state
  const [tasks, setTasks] = useState([]);

  // useEffect demo (count)
  const [count, setCount] = useState(0);

  // Timer & alert demo
  const [showTimer, setShowTimer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Side effect: update page title
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Add task handler
  function handleAddTask(task) {
    if (!task.trim()) return;
    setTasks((prev) => [...prev, task]);
  }

  return (
    <div className="p-6 space-y-12 max-w-2xl mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard Loaded</h1>

      {/* Auth */}
      <section>
        <AuthToggle />
      </section>
      {/* Profile */}
      <section>
        <ProfileCard />
      </section>

      {/* Contact */}
      <section>
        <ContactForm />
      </section>
      {/* Task Manager */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Task Manager</h2>

        <TaskInput onAddTask={handleAddTask} />
        <TaskList tasks={tasks} />
      </section>

      {/* useEffect Counter */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">useEffect Demo</h2>
        <p>Count: {count}</p>

        <Button onClick={() => setCount((c) => c + 1)}>Increase Count</Button>
      </section>

      {/* Timer & Auto-hide Alert */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Timers & Cleanup</h2>

        <Button onClick={() => setShowTimer((v) => !v)}>
          {showTimer ? "Unmount Timer" : "Mount Timer"}
        </Button>

        {showTimer && <TimerCounter />}

        <Button onClick={() => setShowAlert(true)}>Show Auto-Hide Alert</Button>

        {showAlert && (
          <AutoHideAlert
            message="This will disappear in 3 seconds"
            onClose={() => setShowAlert(false)}
          />
        )}
      </section>

      {/* API Posts */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Posts (API)</h2>
        <Posts />
      </section>
    </div>
  );
}

export default Dashboard;
