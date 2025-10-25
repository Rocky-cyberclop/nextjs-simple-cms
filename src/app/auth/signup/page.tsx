"use client";
import { supabase } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Signup with email & password
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // optional: redirectTo: "http://localhost:3000/auth/confirm"
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    // If your Supabase project requires email confirmation, data will not contain a session.
    // Show message and redirect or display instructions:
    router.push("/auth/login");
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}
