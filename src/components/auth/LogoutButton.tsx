"use client";
import { supabase } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  return (
    <button onClick={handleLogout} className="px-3 py-1 border rounded">
      Logout
    </button>
  );
}
