import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [limit]); // dependency-based refetch

  if (loading) {
    return <p className="text-center">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {/* Limit Selector */}
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value={5}>5 Posts</option>
        <option value={10}>10 Posts</option>
        <option value={15}>15 Posts</option>
      </select>

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
          >
            <h3 className="font-bold text-lg mb-2">
              {post.title}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-3">
              {post.body}
            </p>

            <button className="mt-3 text-blue-600 text-sm hover:underline">
              Read more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
