import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const AdminNav = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />

        <nav className="flex flex-wrap items-center gap-4">
          <Link
            href="/admin/products"
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            Productos
          </Link>

          <Link
            href="/admin/sales"
            className="text-white hover:text-yellow-300 font-medium transition"
          >
            Ventas
          </Link>

          <Link
            href="/"
            className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          >
            Tienda
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default AdminNav;
