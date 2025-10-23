"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setPost(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!post) return;

    setSaving(true);
    setError(null);

    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: post.title, content: post.content }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update");
    }

    setSaving(false);
  }

  if (loading) return <main className="p-6">Loading...</main>;
  if (error) return <main className="p-6 text-red-600">{error}</main>;
  if (!post) return <main className="p-6">Post not found</main>;

  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">✏️ Edit Post</h1>
      <form onSubmit={handleSave} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <textarea
          className="border p-2 rounded h-32"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/")}
        >
          Back
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
