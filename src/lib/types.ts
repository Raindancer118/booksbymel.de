export type RetailerLink = { name: string; url: string };
export type Book = {
  title: string;
  slug: string;
  blurb: string;
  cover: string;        // /images/covers/...
  isbn?: string;
  description?: string;
  retailers?: RetailerLink[];
  quotes?: { source: string; text: string }[];
  publicationDate?: string; // ISO
};
export type EventItem = { title: string; datetime: string; location: string; url?: string };
