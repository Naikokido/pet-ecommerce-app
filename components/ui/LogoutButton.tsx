"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("pet_user");
    await fetch("/api/logout", { method: "POST" });
    router.refresh();
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
