"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      router.refresh(); // recarga el estado actual
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white border border-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-purple-600 transition"
    >
      Logout
    </button>
  );
}
