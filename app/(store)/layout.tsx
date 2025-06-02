// app/store/layout.tsx
import { MainNav } from "@/components/ui/MainNav";
import ToastNotification from "@/components/ui/ToastNotification";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <main className="pt-10 pb-32 px-10">{children}</main>
      <ToastNotification />
    </>
  );
}
