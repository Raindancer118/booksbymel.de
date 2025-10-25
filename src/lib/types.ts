export type RetailerLink = { name: string; url: string };
export type Book = {
  title: string;
  slug: string;
  blurb: string;
  tagline?: string;
  cover: string;        // /images/covers/...
  isbn?: string;
  description?: string;
  retailers?: RetailerLink[];
  quotes?: { source: string; text: string }[];
  genres?: string[];
  readingOrder?: string;
  synopses?: { title: string; content: string }[];
  excerpt?: string[];
  sampleUrl?: string;
  formats?: { format: string; details?: string }[];
  testimonials?: { quote: string; source: string; role?: string }[];
  publicationDate?: string; // ISO
};
export type EventItem = { title: string; datetime: string; location: string; url?: string };
