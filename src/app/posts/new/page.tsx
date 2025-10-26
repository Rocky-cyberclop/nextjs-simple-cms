"use client";
import { useCreatePost } from "@/hooks/posts";
import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createPost, loading, error } = useCreatePost();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createPost({ title, content });
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Create New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
        <textarea
          className="border p-2 rounded h-32"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating…" : "Create"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
