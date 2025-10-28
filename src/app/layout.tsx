import "./../styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { site } from "@/lib/seo";

export const metadata: Metadata = {
  title: { default: site.name, template: "%s | " + site.name },
  description: site.description,
  metadataBase: new URL(site.baseUrl),
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: { siteName: site.name, type: "website", url: site.baseUrl }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
