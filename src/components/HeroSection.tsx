import Link from "next/link";

export default function HeroSection(){
  return (
    <section className="container" style={{paddingBlock: '48px'}}>
      <div className="grid" style={{gridTemplateColumns:'1.1fr 0.9fr', alignItems:'center'}}>
        <div>
          <h1>Worte, die nachhallen. Geschichten, die bleiben.</h1>
          <p style={{color:'var(--muted)'}}>Das neue Buch ist jetzt erhältlich – mit exklusiver Leseprobe.</p>
          <div style={{display:'flex', gap:12, marginTop:16}}>
            <Link className="button" href="/buecher">Alle Bücher</Link>
            <Link className="button ghost" href="/newsletter">Newsletter</Link>
          </div>
        </div>
        <div className="card">
          <img alt="Buchcover Platzhalter" src="/images/covers/placeholder.webp" />
        </div>
      </div>
    </section>
  );
}
