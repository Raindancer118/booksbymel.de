import Link from "next/link";
import type { Book } from "@/lib/types";
import Image from "next/image";

export default function BookCard({ book }: { book: Book }) {
  const firstRetailer = book.retailers?.[0]?.url ?? "#" as string;
  const href = book.slug ? (`/buch/${book.slug}` as string) : "/buecher";
  const highlightQuote = book.testimonials?.[0];

  return (
    <article className="card book-card">
      <div className="book-card__media">
        <Image
          src={book.cover}
          alt={`Cover: ${book.title}`}
          width={220}
          height={330} // 2:3
          sizes="(max-width: 600px) 40vw, (max-width: 1200px) 22vw, 220px"
          className="book-cover"
          priority={false}
        />
      </div>
      <div className="book-card__content">
        {book.genres?.length && (
          <div className="book-card__genres" aria-label="Genres">
            {book.genres.slice(0, 3).map(genre => (
              <span key={genre} className="chip">{genre}</span>
            ))}
          </div>
        )}
        <h3>{book.title}</h3>
        {book.tagline && (
          <p className="tagline">{book.tagline}</p>
        )}
        <p className="muted">{book.blurb}</p>
        {highlightQuote && (
          <blockquote className="quote-snippet">
            <p>„{highlightQuote.quote}“</p>
            <footer>
              — {highlightQuote.source}
              {highlightQuote.role ? `, ${highlightQuote.role}` : ""}
            </footer>
          </blockquote>
        )}
        <div className="book-card__actions">
          {/* ✅ String-URL, keine { pathname, query }-Objektform */}
          <Link className="button" href={href as any}>Mehr</Link>
          <Link
            className="button button--ghost"
            href={firstRetailer.startsWith("http") ? firstRetailer : "#" as any}
          >
            Kaufen
          </Link>
        </div>
      </div>
    </article>
  );
}
