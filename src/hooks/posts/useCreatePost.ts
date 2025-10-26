"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function createPost({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unknown" }));
        throw new Error(data.error || "Failed to create post");
      }

      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  }

  return { createPost, loading, error };
}
