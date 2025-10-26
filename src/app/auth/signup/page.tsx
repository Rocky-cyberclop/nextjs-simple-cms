"use client";

import { useSignUp } from "@/hooks/auth";

export default function SignUpPage() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleSignUp,
  } = useSignUp();

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
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

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </main>
  );
}
