'use client';
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm(){
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent){
    e.preventDefault();

    if (!email) return;

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = (data as { error?: string }).error || "Anmeldung fehlgeschlagen.";
        throw new Error(message);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler.");
    }
  }

  if (status === "success") {
    return <p>Bitte Posteingang prüfen – Bestätigungs-Mail versendet.</p>;
  }

  const isLoading = status === "loading";
  const isDisabled = isLoading || status === "success";

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
        aria-invalid={status === "error"}
        aria-describedby={error ? "newsletter-error" : undefined}
      />
      <button className="button" type="submit" disabled={isDisabled} aria-busy={isLoading}>
        {isLoading ? "Wird gesendet…" : "Anmelden"}
      </button>
      <small style={{gridColumn:'1 / -1', color:'var(--muted)'}}>
        Wir speichern E-Mail & Zeitstempel deiner Einwilligung und senden sie zur Double-Opt-In-Verarbeitung an unseren Versanddienstleister. Abmeldung ist jederzeit möglich.
      </small>
      {error ? (
        <p id="newsletter-error" role="alert" style={{gridColumn:'1 / -1', color:'var(--danger, #b00020)'}}>
          {error}
        </p>
      ) : null}
    </form>
  );
}
