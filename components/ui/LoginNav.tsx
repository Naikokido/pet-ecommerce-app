"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const LoginNav = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          >
            Volver a la tienda
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LoginNav;
