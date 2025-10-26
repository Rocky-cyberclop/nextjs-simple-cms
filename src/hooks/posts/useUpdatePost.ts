"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useUpdatePost(id?: string) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function updatePost(updated: { title: string; content: string }) {
    if (!id) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Unknown" }));
        throw new Error(data.error || "Failed to update");
      }

      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setSaving(false);
    }
  }

  return { updatePost, saving, error };
}
