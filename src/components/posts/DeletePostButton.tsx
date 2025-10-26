"use client";

import { useRouter } from "next/navigation";

export function DeletePostButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Post deleted!");
      router.push("/"); // back to list
      router.refresh(); // refresh list
    } else {
      const err = await res.json();
      alert("Failed to delete: " + err.error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      🗑️ Delete
    </button>
  );
}
