import { useState } from "react";
import "./index.css";

import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import ProfileCard from "./components/ProfileCard";
import ContactForm from "./components/ContactForm";
import AuthToggle from "./components/AuthToggle";
import Button from "./components/Button";
import Input from "./components/input";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Input kit demo state
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleAddTask(newTask) {
    setLoading(true);

    setTimeout(() => {
      setTasks([...tasks, newTask]);
      setLoading(false);
    }, 500);
  }

  // Filter tasks (case-insensitive)
  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        <TaskInput onAddTask={handleAddTask} loading={loading} />

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {filteredTasks.length === 0 && searchQuery !== "" ? (
          <p className="text-gray-500">No results found.</p>
        ) : (
          <TaskList tasks={filteredTasks} />
        )}

        {/* Button Variants */}
        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="outline">Outline</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Input Components Kit */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Components</h2>

        <Input
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email === "" ? "Email is required" : ""}
        />

        <Input
          label="Message"
          textarea
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Input
          label="Disabled Input"
          value="Disabled field"
          disabled
        />
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
