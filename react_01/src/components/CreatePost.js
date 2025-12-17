import { useState } from "react";
import Button from "./Button";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            body,
            userId: 1,
          }),
        }
      );

      const data = await res.json();

      // Optimistic update
      onPostCreated({
        id: Date.now(),
        title,
        body,
      });

      setSuccess("Post created successfully!");
      setTitle("");
      setBody("");
      console.log("API response:", data);
    } catch (err) {
      console.error("Failed to create post", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full rounded"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />

      <Button variant="primary" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>

      {success && (
        <p className="text-green-600 text-sm">{success}</p>
      )}
    </form>
  );
}

export default CreatePost;
