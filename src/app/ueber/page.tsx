import Seo from "@/components/Seo";

export default function AboutPage(){
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"AboutPage",
    "name":"Über Mel",
    "url":"https://booksbymel.de/ueber"
  };
  return (
    <main className="container">
      <Seo title="Über" description="Kurz- und Langbio, Pressefoto und Kontakt." jsonLd={jsonLd} ogImage="/images/og/default.jpg" />
      <h1>Über Mel</h1>
      <p>Kurzbio hier einfügen – 2–3 Sätze.</p>
      <p>Langbio – ~150 Wörter. Themen, Genres, Veröffentlichungen.</p>
      <img src="/images/portraits/portrait.webp" alt="Mel – Autorenportrait"/>
    </main>
  );
}
