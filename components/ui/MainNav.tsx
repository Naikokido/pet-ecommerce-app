import { CategoriesResponseSchema } from "@/src/schemas";
import Logo from "./Logo";
import Link from "next/link";

const getCategories = async () => {
  const url = `${process.env.API_URL}/categories`;
  const res = await fetch(url);
  const json = await res.json();
  const categories = CategoriesResponseSchema.parse(json);
  return categories;
};

export const MainNav = async () => {
  const categories = await getCategories();

  return (
    <header className="bg-gradient-to-r from-purple-500 via-purple-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />

        <nav className="flex flex-wrap items-center gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className="text-white hover:text-yellow-300 font-medium transition"
            >
              {category.name}
            </Link>
          ))}

          <Link
            href="/admin/sales"
            className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          >
            Panel Admin
          </Link>
        </nav>
      </div>
    </header>
  );
};
