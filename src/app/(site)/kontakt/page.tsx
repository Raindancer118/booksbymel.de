import Seo from "@/components/Seo";

export const runtime = "edge";

export default function KontaktPage(){
  return (
    <main className="container">
      <Seo title="Kontakt" description="Anfragen zu Presse, Lesungen & Kooperationen." ogImage="/images/og/default.jpg" />
      <h1>Kontakt</h1>
      <p>E-Mail: <a href="mailto:kontakt@booksbymel.de">kontakt@booksbymel.de</a></p>
      <p>Agentur/Verlag (optional): …</p>
    </main>
  );
}
