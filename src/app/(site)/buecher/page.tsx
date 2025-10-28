import { getBooks } from "@/lib/books";
import BookCard from "@/components/BookCard";
import Seo from "@/components/Seo";

export const runtime = "edge";

export default function BooksPage(){
  const books = getBooks();
  return (
    <main className="container">
      <Seo title="Bücher" description="Alle Titel auf einen Blick." ogImage="/images/og/default.jpg" />
      <h1>Bücher</h1>
      <div className="grid grid--auto-fit">
        {books.map(b => <BookCard key={b.slug} book={b} />)}
      </div>
    </main>
  );
}
