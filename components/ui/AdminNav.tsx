"use client";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { usePathname } from "next/navigation";

export const AdminNav = () => {
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />

        <nav className="flex flex-wrap items-center gap-4">
          <Link
            href="/admin/products"
            className={`font-medium transition px-3 py-2 rounded
              ${
                pathname === "/admin/products"
                  ? "bg-yellow-400 text-purple-900 shadow"
                  : "text-white hover:text-yellow-300"
              }
            `}
          >
            Productos
          </Link>

          <Link
            href="/admin/sales"
            className={`font-medium transition px-3 py-2 rounded
              ${
                pathname === "/admin/sales"
                  ? "bg-yellow-400 text-purple-900 shadow"
                  : "text-white hover:text-yellow-300"
              }
            `}
          >
            Ventas
          </Link>

          <Link
            href="/"
            className={`font-semibold transition px-4 py-2 rounded-md
              ${
                pathname === "/"
                  ? "bg-yellow-400 text-purple-900 shadow"
                  : "bg-yellow-300 text-gray-900 hover:bg-yellow-400"
              }
            `}
          >
            Tienda
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AdminNav;
