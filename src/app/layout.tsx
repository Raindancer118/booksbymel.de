import "../styles/variables.css";
import "../styles/typography.css";
import "../styles/globals.css";
import type { Metadata } from "next";
import { site } from "@/lib/seo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: { default: site.name, template: "%s | " + site.name },
  description: site.description,
  metadataBase: new URL(site.baseUrl),
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: { siteName: site.name, type: "website", url: site.baseUrl }
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="de">
      <body>
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
