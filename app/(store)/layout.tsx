import { MainNav } from "@/components/ui/MainNav";
import ToastNotification from "@/components/ui/ToastNotification";
import SectionBreadcrumb from "../../components/ui/SectionBreadcrumb";
import { FloatingChat } from "@/components/ui/FloatingChat";
import { UserProvider } from "@/components/context/UserProvider";
import { CategoriesResponseSchema } from "@/src/schemas";
import Footer from "@/components/ui/Footer";

const getCategories = async () => {
  const url = `${process.env.API_URL}/categories`;
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();
  const categories = CategoriesResponseSchema.parse(json);
  return categories.map((cat: { id: number; name: string }) => ({
    id: String(cat.id),
    name: cat.name,
  }));
};

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <UserProvider>
      <MainNav categories={categories} />
      <SectionBreadcrumb />
      <main className="pt-10 pb-32 px-10">{children}</main>
      <ToastNotification />
      <FloatingChat />
      <Footer />
    </UserProvider>
  );
}
