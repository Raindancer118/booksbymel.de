'use client';
import { useState } from "react";

export default function NewsletterForm(){
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  function onSubmit(e: React.FormEvent){
    e.preventDefault();
    // TODO: API-Route anbinden (Brevo/MailerLite) für Double-Opt-In
    setOk(true);
  }

  if (ok) return <p>Bitte Posteingang prüfen – Bestätigungs-Mail versendet.</p>;

  return (
    <form onSubmit={onSubmit} className="grid" style={{gridTemplateColumns:'1fr auto', gap:12}}>
      <label className="sr-only" htmlFor="email">E-Mail</label>
      <input
        id="email"
        required
        type="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="dein.name@mail.de"
        style={{padding:'12px 14px', borderRadius:'12px', border:'1px solid #0001'}}
      />
      <button className="button" type="submit">Anmelden</button>
      <small style={{gridColumn:'1 / -1', color:'var(--muted)'}}>
        Double-Opt-In, jederzeit abbestellbar. Es gelten Impressum & Datenschutz.
      </small>
    </form>
  );
}
