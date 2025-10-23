"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "../data/posts";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Posts</h1>
      <Link href="/new" className="text-blue-600 underline mb-4 inline-block">
        ➕ Create New Post
      </Link>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="border rounded p-3">
            <h2 className="font-semibold">{p.title}</h2>
            <p>{p.content}</p>
          </li>
        ))}
        {posts.length === 0 && <p>No posts yet.</p>}
      </ul>
    </main>
  );
}
