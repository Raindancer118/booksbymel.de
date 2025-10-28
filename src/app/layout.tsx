import "./../styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { site } from "@/lib/seo";

const themeScript = `
(() => {
  const storageKey = 'theme-preference';
  const root = document.documentElement;
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  };

  let storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    storedTheme = null;
  }

  if(storedTheme === 'light' || storedTheme === 'dark'){
    applyTheme(storedTheme);
    return;
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const systemTheme = media.matches ? 'dark' : 'light';
  applyTheme(systemTheme);
})();
`;

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
    <html lang="de" suppressHydrationWarning>
      <body>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
