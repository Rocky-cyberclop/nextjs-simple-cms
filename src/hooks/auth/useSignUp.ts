"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabase/client";

export function useSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/auth/login");
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    handleSignUp,
  };
}
