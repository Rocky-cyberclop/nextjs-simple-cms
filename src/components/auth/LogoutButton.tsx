"use client";
import { supabase } from "@/libs/supabase/client";

export default function LogoutButton() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  }

  return (
    <button onClick={handleLogout} className="px-3 py-1 border rounded">
      Logout
    </button>
  );
}
