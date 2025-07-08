import AdminNav from "@/components/ui/AdminNav";
import { FloatingChat } from "@/components/ui/FloatingChat";
import Footer from "@/components/ui/Footer";
import SectionBreadcrumb from "@/components/ui/SectionBreadcrumb";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNav />
      <SectionBreadcrumb />
      <div className="lg:min-h-screen container mx-auto mt-10 px-10 lg:px-0">
        <div className="bg-white shadow w-full mx-auto p-10 my-10 lg:w-3/5">
          {children}
        </div>
      </div>
      <FloatingChat />
      <Footer />
      <ToastNotification />
    </>
  );
}
