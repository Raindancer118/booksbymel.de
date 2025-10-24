import "./../styles/globals.css";
import type { Metadata } from "next";
import { site } from "@/lib/seo";
import Footer from "@/components/Footer";

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
    <header className="container" style={{paddingBlock:16}}>
      <nav style={{display:'flex', gap:16, alignItems:'center', justifyContent:'space-between'}}>
        <a href="/" style={{fontWeight:700}}>Books by Mel</a>
        <div style={{display:'flex', gap:16}}>
          <a href="/buecher">Bücher</a>
          <a href="/ueber">Über</a>
          <a href="/events">Events</a>
          <a href="/newsletter">Newsletter</a>
          <a href="/presse">Presse</a>
          <a href="/kontakt">Kontakt</a>
        </div>
      </nav>
    </header>
    {children}
    <Footer />
    </body>
    </html>
  );
}
