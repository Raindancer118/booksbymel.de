import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/lib/books";
import Seo from "@/components/Seo";
import BookSideHero from "@/components/BookSideHero";

export default function HomePage(){
  const books = getBooks();
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"Person",
    "name":"Mel",
    "url":"https://booksbymel.de",
    "jobTitle":"Author"
  };

  return (
    <>
      <BookSideHero />   {/* ← neues realistisches Seitenbuch ganz oben */}
      <section className="container" style={{paddingBlock:24}}>
        <h2>Neu & empfohlen</h2>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))'}}>
          {books.map(b => <BookCard key={b.slug} book={b} />)}
        </div>
      </section>
      <Seo
        title="Start"
        description="Offizielle Website – aktuelle Bücher, Termine & Newsletter."
        jsonLd={jsonLd}
        ogImage="/images/og/default.jpg"
      />
      <HeroSection />
      <section className="container" style={{paddingBlock:24}}>
        <h2>Neu & empfohlen</h2>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))'}}>
          {books.map(b => <BookCard key={b.slug} book={b} />)}
        </div>
      </section>
    </>
  );
}

