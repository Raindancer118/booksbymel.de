export default function DatenschutzPage(){
  return (
    <main className="container">
      <h1>Datenschutz</h1>
      <p>Hinweise gemäß DSGVO. Beschreibung der Zwecke, Rechtsgrundlagen, Speicherdauer, Widerruf, Betroffenenrechte.</p>
      <h2>Newsletter</h2>
      <p>
        Für den Versand des Newsletters verarbeiten wir deine E-Mail-Adresse und protokollieren den Zeitpunkt der Einwilligung
        sowie die Quelle (booksbymel.de/newsletter). Die Daten werden über eine abgesicherte API an unseren Versanddienstleister
        (z. B. Brevo oder MailerLite) übermittelt, der die Double-Opt-In-Bestätigung übernimmt. Die Einwilligung kannst du
        jederzeit über den Abmeldelink in jedem Mailing oder per Nachricht an die im Impressum genannten Kontaktdaten widerrufen.
        Wir speichern die Protokolldaten, um die erteilte Zustimmung nachweisen zu können.
      </p>
      <h2>Hosting</h2>
      <p>Angaben zum Hoster/Plattform (Vercel/Netlify/…), Auftragsverarbeitung, Logs.</p>
      <h2>Cookies/Tracking</h2>
      <p>Keine Drittanbieter-Cookies/Schriften; Analytics optional (Plausible/Umami) – falls genutzt, hier erläutern.</p>
    </main>
  );
}
