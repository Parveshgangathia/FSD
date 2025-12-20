import { useState, useEffect } from "react";
import "./index.css";

import CreatePost from "./components/CreatePost";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import ProfileCard from "./components/ProfileCard";
import ContactForm from "./components/ContactForm";
import AuthToggle from "./components/AuthToggle";
import Button from "./components/Button";
import Input from "./components/Input";
import Loading from "./components/Loading";
import Posts from "./components/Posts";
import TimerCounter from "./components/TimerCounter";
import AutoHideAlert from "./components/AutoHideAlert";
import NotificationsPanel from "./components/NotificationsPanel";
import FocusInput from "./components/FocusInput";
import RenderCounter from "./components/RenderCounter";
import AccessibleLoginForm from "./components/AccessibleLoginForm";

function App() {
  // Modal + Posts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localPosts, setLocalPosts] = useState([]);

  function handlePostCreated(newPost) {
    setLocalPosts((prev) => [newPost, ...prev]);
    setIsModalOpen(false);
  }

  // Timers & Alerts
  const [showTimer, setShowTimer] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([]);

  function addNotification(type, message) {
    setNotifications((prev) => [
      { id: Date.now(), type, message },
      ...prev,
    ]);
  }

  function removeNotification(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  // Page loading
  const [pageLoading, setPageLoading] = useState(true);

  // Task manager
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect demo
  const [count, setCount] = useState(0);

  // Inputs
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fake loading screen
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Page title effect
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  function handleAddTask(newTask) {
    setLoading(true);
    setTimeout(() => {
      setTasks((prev) => [...prev, newTask]);
      setLoading(false);
    }, 500);
  }

  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (pageLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">
        React Practice Dashboard
      </h1>

      {/* useEffect Demo */}
      <section className="space-y-3 text-center">
        <h2 className="text-2xl font-semibold">useEffect Demo</h2>
        <p className="text-lg">Count: {count}</p>
        <Button onClick={() => setCount((c) => c + 1)}>
          Increase Count
        </Button>
      </section>

      <AuthToggle />

      {/* Task Manager */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Task Manager</h2>

        <TaskInput onAddTask={handleAddTask} loading={loading} />

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />

        {filteredTasks.length === 0 && searchQuery ? (
          <p className="text-gray-500">No results found.</p>
        ) : (
          <TaskList tasks={filteredTasks} />
        )}

        <div className="flex gap-3 flex-wrap">
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Cleanup & Timers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cleanup & Timers</h2>

        <Button onClick={() => setShowTimer((v) => !v)}>
          {showTimer ? "Unmount Timer" : "Mount Timer"}
        </Button>

        {showTimer && <TimerCounter />}

        <Button onClick={() => setShowAlert(true)}>
          Show Auto-Hide Alert
        </Button>

        {showAlert && (
          <AutoHideAlert
            message="This will disappear in 3 seconds"
            onClose={() => setShowAlert(false)}
          />
        )}

        <Button onClick={() => addNotification("success", "Saved successfully")}>
          Add Notification
        </Button>
      </section>

      <NotificationsPanel
        notifications={notifications}
        removeNotification={removeNotification}
      />

      {/* Inputs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Components</h2>

        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!email ? "Email is required" : ""}
        />

        <Input
          label="Message"
          textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Input label="Disabled Input" value="Disabled field" disabled />
      </section>

      <ProfileCard />
      <ContactForm />

      {/* Create Post */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Create Post</h2>

        <Button onClick={() => setIsModalOpen(true)}>New Post</Button>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-xl font-bold mb-4">New Post</h3>
          <CreatePost onPostCreated={handlePostCreated} />
        </Modal>

        {localPosts.map((post) => (
          <div key={post.id} className="border rounded-xl p-4 shadow">
            <h4 className="font-bold">{post.title}</h4>
            <p className="text-sm text-gray-600">{post.body}</p>
          </div>
        ))}
      </section>

      {/* useRef & Accessibility */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          useRef & Accessibility
        </h2>

        <FocusInput />
        <RenderCounter />
        <AccessibleLoginForm />
      </section>

      {/* API Posts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Posts (API + useEffect)
        </h2>
        <Posts />
      </section>
    </div>
  );
}

export default App;
