"use client";

import { usePathname } from "next/navigation";

const categoryMap: Record<string, string> = {
  "1": "Productos / Alimentos",
  "2": "Productos / Juguetes",
  "3": "Productos / Accesorios",
  // Admin routes
  admin: "Panel Admin",
  products: "Productos",
  sales: "Ventas",
  new: "Nuevo",
  edit: "Editar",
};

export default function SectionBreadcrumb() {
  const pathname = usePathname();

  const sections = pathname.split("/").filter(Boolean);

  const mappedSections = sections.map((section) => {
    if (categoryMap[section]) {
      return categoryMap[section];
    }
    return section.charAt(0).toUpperCase() + section.slice(1).toLowerCase();
  });

  return (
    <div className="flex flex-row text-lg text-gray-600 my-4 ml-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon icon-tabler icons-tabler-filled icon-tabler-pinned"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
      </svg>{" "}
      {mappedSections.length > 0 ? (
        mappedSections.join(" / ")
      ) : (
        <span>Inicio</span>
      )}
    </div>
  );
}
