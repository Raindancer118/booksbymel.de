import Link from "next/link";

export default function Footer(){
  return (
    <footer className="container" style={{paddingBlock:32, borderTop:'1px solid #0001', marginTop:40}}>
      <div className="grid" style={{gridTemplateColumns:'1fr auto'}}>
        <p>© {new Date().getFullYear()} Books by Mel – Alle Rechte vorbehalten.</p>
        <nav style={{display:'flex', gap:16}}>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
