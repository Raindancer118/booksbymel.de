import Link from "next/link";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }){
  const firstRetailer = book.retailers?.[0]?.url ?? "#";
  return (
    <article className="card">
      <img src={book.cover} alt={`Cover: ${book.title}`} />
      <h3 style={{marginTop:12}}>{book.title}</h3>
      <p style={{color:'var(--muted)'}}>{book.blurb}</p>
      <div style={{display:'flex', gap:10, marginTop:10}}>
        <Link className="button" href={`/buch/${book.slug}`}>Mehr</Link>
        <Link className="button ghost" href={firstRetailer}>Kaufen</Link>
      </div>
    </article>
  );
}
