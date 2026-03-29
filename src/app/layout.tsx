import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { brand } from "@config/brand";

import "./globals.css";

export const metadata: Metadata = {
  title: brand.portalTitle,
  description: `${brand.siteName} — образовательный портал для учеников, родителей и педагогов.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
