// app/(store)/[categoryId]/layout.tsx
import { ReactNode } from "react";
import ShoppingCart from "@/components/cart/ShoppingCart";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return (
    <main className="lg:flex lg:h-screen lg:overflow-y-hidden">
      <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-10">
        {children}
      </div>
      <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-white">
        <ShoppingCart />
      </aside>
    </main>
  );
}
