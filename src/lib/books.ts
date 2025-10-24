import data from "@/content/books.json";
import type { Book } from "./types";

export function getBooks(): Book[] {
  return (data as Book[]).slice();
}

export function getBook(slug: string): Book | undefined {
  return getBooks().find(b => b.slug === slug);
}
