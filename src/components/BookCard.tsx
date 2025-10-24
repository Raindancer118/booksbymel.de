import Link from "next/link";
import type { Book } from "@/lib/types";
import Image from "next/image";

export default function BookCard({ book }: { book: Book }) {
  const firstRetailer = book.retailers?.[0]?.url ?? "#" as string;
  const href = book.slug ? (`/buch/${book.slug}` as string) : "/buecher";

  return (
    <article className="card">
      <Image
        src={book.cover}
        alt={`Cover: ${book.title}`}
        width={220}
        height={330} // 2:3
        sizes="(max-width: 600px) 40vw, (max-width: 1200px) 22vw, 220px"
        className="book-cover"
        priority={false}
      />
      <h3 style={{ marginTop: 12 }}>{book.title}</h3>
      <p style={{ color: "var(--muted)" }}>{book.blurb}</p>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {/* ✅ String-URL, keine { pathname, query }-Objektform */}
        <Link className="button" href={href as any}>Mehr</Link>
        <Link
          className="button ghost"
          href={firstRetailer.startsWith("http") ? firstRetailer : "#" as any}
        >
          Kaufen
        </Link>
      </div>
    </article>
  );
}
