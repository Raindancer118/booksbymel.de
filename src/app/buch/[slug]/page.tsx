import { getBook, getBooks } from "@/lib/books";
import RetailerButtons from "@/components/RetailerButtons";
import Seo from "@/components/Seo";

type Props = { params: { slug: string } };

export async function generateStaticParams(){
  return getBooks().map(b => ({ slug: b.slug }));
}

export default function BookDetailPage({ params }: Props){
  const book = getBook(params.slug);
  if (!book) return <main className="container"><h1>Nicht gefunden</h1></main>;

  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"Book",
    "name": book.title,
    "author": { "@type":"Person", "name":"Mel" },
    "inLanguage":"de",
    "isbn": book.isbn ?? undefined,
    "offers": book.retailers?.map(r => ({ "@type":"Offer", "url": r.url }))
  };

  return (
    <main className="container">
      <Seo title={book.title} description={book.blurb} jsonLd={jsonLd} ogImage="/images/og/default.jpg" />
      <div className="grid" style={{gridTemplateColumns:'minmax(260px, 360px) 1fr', alignItems:'start'}}>
        <img src={book.cover} alt={`Cover: ${book.title}`} />
        <div>
          <h1>{book.title}</h1>
          <p style={{color:'var(--muted)'}}>{book.blurb}</p>
          {book.retailers && <RetailerButtons links={book.retailers} />}
        </div>
      </div>
    </main>
  );
}
