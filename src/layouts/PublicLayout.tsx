"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <>
      <Navbar showFullNav={!isAuthPage} />
      {children}
      <Footer />
    </>
  );
}
