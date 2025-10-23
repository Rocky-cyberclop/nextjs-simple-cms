import Link from "next/link";
import { Post } from "@/data/posts";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
  const posts: Post[] = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Posts</h1>

      <Link href="/posts/new" className="text-blue-600 underline mb-4 inline-block">
        ➕ Create New Post
      </Link>

      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.id} className="border rounded p-3">
            <h2 className="font-semibold">{p.title}</h2>
            <p>{p.content}</p>
            <Link href={`/posts/${p.id}`} className="text-blue-600 underline text-sm">
              View / Edit
            </Link>
          </li>
        ))}
        {posts.length === 0 && <p>No posts yet.</p>}
      </ul>
    </main>
  );
}
