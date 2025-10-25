import Link from "next/link";

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>© {new Date().getFullYear()} Books by Mel – Alle Rechte vorbehalten.</p>
        <nav className="site-footer__nav">
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
