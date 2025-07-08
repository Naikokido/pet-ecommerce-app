"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiUser3Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

type Category = {
  id: string;
  name: string;
};

type User = {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
} | null;

export function MainNav({ categories }: { categories?: Category[] }) {
  const [user, setUser] = useState<User>(null);
  const [hasAuth, setHasAuth] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setHasAuth(document.cookie.includes("token"));
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("pet_user") : null;
    if (stored) setUser(JSON.parse(stored));
    else setUser(null);
  }, []);

  // Cierra el dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const isAdmin =
    user?.roles?.includes("admin") || user?.roles?.includes("super-user");

  const handleLogout = () => {
    localStorage.removeItem("pet_user");
    fetch("/api/logout", { method: "POST" }).then(() =>
      window.location.reload()
    );
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />

        <nav className="flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className={`font-medium transition px-3 py-2 rounded
              ${
                pathname === "/"
                  ? "bg-yellow-400 text-purple-900 shadow"
                  : "text-white hover:text-yellow-300"
              }
            `}
          >
            Inicio
          </Link>

          {categories?.map((category) => {
            const isActive = pathname === `/${category.id}`;
            return (
              <Link
                key={category.id}
                href={`/${category.id}`}
                className={`font-medium transition px-3 py-2 rounded
                  ${
                    isActive
                      ? "bg-yellow-400 text-purple-900 shadow"
                      : "text-white hover:text-yellow-300"
                  }
                `}
              >
                {category.name}
              </Link>
            );
          })}

          {hasAuth && isAdmin && (
            <Link
              href="/admin/sales"
              className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
            >
              Panel Admin
            </Link>
          )}

          {!hasAuth && (
            <>
              <Link
                href="/login"
                className="text-white border border-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-purple-600 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="text-white border border-white px-4 py-2 rounded-md font-medium hover:bg-white hover:text-purple-600 transition"
              >
                Registrarse
              </Link>
            </>
          )}

          {hasAuth && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 text-white hover:text-yellow-300 transition focus:outline-none"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                <RiUser3Line size={24} />
                <span>{user.fullName}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-purple-700 hover:bg-yellow-100 rounded"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
