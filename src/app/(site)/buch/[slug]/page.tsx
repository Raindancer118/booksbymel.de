import { getBook, getBooks } from "@/lib/books";
import RetailerButtons from "@/components/RetailerButtons";
import Seo from "@/components/Seo";
import Image from "next/image";
import SynopsisTabs from "@/components/SynopsisTabs";
import QuoteCarousel from "@/components/QuoteCarousel";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export async function generateStaticParams(){
  return getBooks().map(b => ({ slug: b.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const book = getBook(params.slug);
  if (!book) {
    return { title: "Buch nicht gefunden" };
  }

  const description = book.tagline ?? book.blurb;
  const ogImage = `/buch/${book.slug}/opengraph-image`;

  return {
    title: `${book.title} | booksbymel.de`,
    description,
    openGraph: {
      title: book.title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description,
      images: [ogImage],
    },
  };
}

export default function BookDetailPage({ params }: Props){
  const book = getBook(params.slug);
  if (!book) return <main className="container"><h1>Nicht gefunden</h1></main>;

  const genres = book.genres ?? [];
  const synopses = book.synopses ?? [];
  const excerpt = book.excerpt ?? [];
  const formats = book.formats ?? [];
  const testimonials = book.testimonials ?? [];
  const retailers = book.retailers ?? [];

  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"Book",
    "name": book.title,
    "alternateName": book.tagline ?? undefined,
    "author": { "@type":"Person", "name":"Mel" },
    "inLanguage":"de",
    "isbn": book.isbn ?? undefined,
    "datePublished": book.publicationDate ?? undefined,
    "genre": genres.length ? genres : undefined,
    "bookFormat": formats.length ? formats.map(format => format.format) : undefined,
    "offers": retailers.length ? retailers.map(r => ({ "@type":"Offer", "url": r.url })) : undefined,
    "review": testimonials.length ? testimonials.map(testimonial => ({
      "@type": "Review",
      "reviewBody": testimonial.quote,
      "author": { "@type": "Person", "name": testimonial.source },
    })) : undefined,
  };

  const ogImage = `/buch/${book.slug}/opengraph-image`;

  return (
    <main className="container book-detail">
      <Seo title={book.title} description={book.tagline ?? book.blurb} jsonLd={jsonLd} ogImage={ogImage} />
      <article className="book-hero grid">
        <div className="book-hero__media">
          <Image
            src={book.cover}
            alt={`Cover: ${book.title}`}
            width={360}
            height={540}                                 // 2:3
            sizes="(max-width: 900px) 65vw, 320px"
            className="book-cover-lg"
            priority={false}
          />
        </div>
        <div className="book-hero__content">
          {book.readingOrder && <span className="chip chip-accent">{book.readingOrder}</span>}
          <h1>{book.title}</h1>
          {book.tagline && <p className="tagline tagline-lg">{book.tagline}</p>}
          <p className="muted">{book.blurb}</p>
          <div className="book-hero__meta">
            {genres.length > 0 && (
              <div className="book-hero__genres" aria-label="Genres">
                {genres.map(genre => (
                  <span className="chip" key={genre}>{genre}</span>
                ))}
              </div>
            )}
            {book.publicationDate && (
              <p><strong>Erscheinungstermin:</strong> {book.publicationDate}</p>
            )}
          </div>
          {retailers.length > 0 && (
            <div className="book-hero__actions">
              <RetailerButtons links={retailers} />
            </div>
          )}
        </div>
      </article>

      <section className="book-sections grid">
        <div className="book-main">
          <section>
            <h2>Worum geht&apos;s?</h2>
            {synopses.length ? (
              <SynopsisTabs synopses={synopses} />
            ) : (
              <p>{book.description ?? book.blurb}</p>
            )}
          </section>

          <section className="card look-inside">
            <h2>Look inside</h2>
            {excerpt.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            {book.sampleUrl && (
              <a className="button button--ghost" href={book.sampleUrl} target="_blank" rel="noopener noreferrer">
                Leseprobe öffnen
              </a>
            )}
          </section>
        </div>

        <aside className="book-sidebar">
          <section className="card key-facts">
            <h2>Key Facts</h2>
            <dl>
              {book.isbn && (
                <div>
                  <dt>ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
              )}
              {book.publicationDate && (
                <div>
                  <dt>Veröffentlichung</dt>
                  <dd>{book.publicationDate}</dd>
                </div>
              )}
              {book.readingOrder && (
                <div>
                  <dt>Lesereihenfolge</dt>
                  <dd>{book.readingOrder}</dd>
                </div>
              )}
              {genres.length > 0 && (
                <div>
                  <dt>Genres</dt>
                  <dd>{genres.join(", ")}</dd>
                </div>
              )}
              {formats.length > 0 && (
                <div>
                  <dt>Formate</dt>
                  <dd>
                    <ul>
                      {formats.map((format, idx) => (
                        <li key={`${format.format}-${idx}`}>
                          <strong>{format.format}</strong>
                          {format.details ? ` · ${format.details}` : ""}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {testimonials.length ? (
            <section className="card">
              <h2>Leserstimmen</h2>
              <QuoteCarousel testimonials={testimonials} />
            </section>
          ) : null}
        </aside>
      </section>
    </main>
  );
}
