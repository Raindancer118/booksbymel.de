import Link from "next/link";
import type { Book } from "@/lib/types";
import Image from "next/image";

export default function BookCard({ book }: { book: Book }){
  const firstRetailer = book.retailers?.[0]?.url ?? "#";
  return (
    <article className="card">
      <Image
        src={book.cover}
        alt={`Cover: ${book.title}`}
        width={320}
        height={480}
        sizes="(max-width: 600px) 45vw, (max-width: 1200px) 25vw, 240px"
        style={{ width: "100%", height: "auto", borderRadius: "12px", objectFit: "cover" }}
        priority={false}
      />
      <h3 style={{marginTop:12}}>{book.title}</h3>
      <p style={{color:'var(--muted)'}}>{book.blurb}</p>
      <div style={{display:'flex', gap:10, marginTop:10}}>
        <Link className="button" href={`/buch/${book.slug}`}>Mehr</Link>
        <Link className="button ghost" href={firstRetailer}>Kaufen</Link>
      </div>
    </article>
  );
}
