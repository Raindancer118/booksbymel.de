import data from "@/content/books.json";
import type { Book } from "./types";

const booksData: ReadonlyArray<Book> = Object.freeze([...(data as Book[])]);

export function getBooks(): ReadonlyArray<Book> {
  return booksData;
}

export function getBook(slug: string): Book | undefined {
  return booksData.find(book => book.slug === slug);
}
