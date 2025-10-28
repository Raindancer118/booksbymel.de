export const runtime = "edge";

export default function ImpressumPage(){
  return (
    <main className="container">
      <h1>Impressum</h1>
      <p><strong>Anbieter</strong><br/>Vorname Nachname<br/>Straße Nr.<br/>PLZ Ort</p>
      <p><strong>Kontakt</strong><br/>E-Mail: kontakt@booksbymel.de</p>
      <p><strong>Umsatzsteuer-ID</strong> (falls vorhanden): …</p>
      <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV: …</p>
    </main>
  );
}
