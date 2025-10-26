"use client";

import Link from "next/link";
import { useUser } from "@/hooks/auth/useUser";
import LogoutButton from "@/components/auth/LogoutButton";

export const Header = () => {
  const { user, loading } = useUser();

  return (
    <header className="p-4 border-b">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/">My CMS</Link>
        <nav className="flex items-center gap-3">
          {!loading && !user && (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/signup">Sign Up</Link>
            </>
          )}
          {user && (
            <>
              <span className="text-sm">Hi, {user.email}</span>
              <LogoutButton />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
