import Image from "next/image";
import type { Route } from "next";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import FeatureGrid from "@/components/FeatureGrid";
import TestimonialCard from "@/components/TestimonialCard";
import NewsletterForm from "@/components/NewsletterForm";
import Seo from "@/components/Seo";
import FloatingLeaves from "@/components/FloatingLeaves";
import { getBooks } from "@/lib/books";
import { getEvents } from "@/lib/events";
import styles from "./page.module.css";

export default function HomePage() {
  const books = getBooks();
  const featuredBooks = books.slice(0, 4);
  const events = getEvents();
  const upcomingEvents = events.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Mel",
        "url": "https://booksbymel.de",
        "jobTitle": "Author",
        "description": "Zeitgenössische Erzählerin für bewegende Geschichten aus weiblicher Perspektive.",
      },
      ...featuredBooks.map((book) => ({
        "@type": "Book",
        "name": book.title,
        "description": book.blurb,
        "image": `https://booksbymel.de${book.cover}`,
        "isbn": book.isbn,
        "url": `https://booksbymel.de/buch/${book.slug}`,
        "author": {
          "@type": "Person",
          "name": "Mel",
        },
        ...(book.retailers?.[0]
          ? {
              offers: {
                "@type": "Offer",
                url: book.retailers[0].url,
                availability: "https://schema.org/InStock",
              },
            }
          : {}),
      })),
      ...upcomingEvents.map((event) => ({
        "@type": "Event",
        "name": event.title,
        "startDate": event.datetime,
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
          "@type": "Place",
          "name": event.location,
        },
        ...(event.url ? { url: event.url } : {}),
      })),
    ],
  };

  const spotlightFeatures = [
    {
      title: "Intensive Figuren", 
      description: "Empathische Charaktere, die lange nach der letzten Seite begleiten.",
    },
    {
      title: "Literarischer Pop", 
      description: "Zwischen Gegenwartsliteratur und Popkultur – zugänglich und doch tiefgründig.",
    },
    {
      title: "Lesungen & Workshops", 
      description: "Live-Termine mit interaktiven Q&As und Schreibimpulsen für Nachwuchsautor*innen.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Mel schreibt mit einer eindringlichen, poetischen Stimme, die direkt ins Herz trifft.",
      name: "Clara Feldmann",
      role: "Literaturbloggerin, Kapitelweise",
    },
    {
      quote: "Selten habe ich Figuren so lebendig und verletzlich zugleich erlebt.",
      name: "Jonas Berger",
      role: "Rezensent, BücherAtlas",
    },
    {
      quote: "Ihre Lesungen sind wie intime Gespräche über das, was uns bewegt.",
      name: "Lea Hoffmann",
      role: "Programmleitung, Stadtbibliothek Köln",
    },
  ];

  return (
    <>
      <Seo
        title="Start"
        description="Offizielle Website – aktuelle Bücher, Termine & Newsletter."
        jsonLd={jsonLd}
        ogImage="/images/og/default.jpg"
      />

      <HeroSection
        headline="Worte, die nachhallen. Geschichten, die bleiben."
        tagline="Das neue Buch ist jetzt erhältlich – inklusive exklusiver Leseprobe im Newsletter."
        primaryCta={{ label: "Jetzt entdecken", href: "/buch/ophelia" as Route<string> }}
        secondaryCta={{ label: "Newsletter", href: "/newsletter" as Route<string> }}
        heroImage={{
          src: "/images/covers/Ophelia.jpg",
          alt: "Buchcover von Ophelia",
          width: 640,
          height: 800,
        }}
      />

      <section className={`container ${styles.section} ${styles.revealUp}`}>
        <div className={styles.split}>
          <div className={styles.spotlightImageWrapper}>
            <Image
              src="/images/textures/cover.jpg"
              alt="Porträt der Autorin Mel"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={styles.spotlightImage}
            />
          </div>
          <div>
            <div className={styles.sectionHeader}>
              <p>Autorin im Fokus</p>
              <h2>Melanie Thason</h2>
            </div>
            <p>
              Mel schreibt über junge Frauen, die ihren Platz in einer lauten Welt suchen –
              emotional, ehrlich und mit einem untrüglichen Blick für Zwischentöne. Ihre
              Texte verbinden poetische Sprache mit Popkultur und gesellschaftlichen Fragen.
            </p>
            <FeatureGrid items={spotlightFeatures} />
          </div>
        </div>
      </section>

      <section className={`container ${styles.section} ${styles.revealUp} ${styles.revealDelaySm}`}>
        <div className={styles.sectionHeader}>
          <p>Neu & empfohlen</p>
          <h2>Frisch im Regal</h2>
        </div>
        <div className={styles.slider}>
          {featuredBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      <section className={`container ${styles.section} ${styles.revealUp} ${styles.revealDelayMd}`}>
        <div className={styles.sectionHeader}>
          <p>Leserstimmen</p>
          <h2>Was andere sagen</h2>
        </div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
            />
          ))}
        </div>
      </section>

      <section className={`container ${styles.section} ${styles.revealUp} ${styles.revealDelayLg}`}>
        <div className={styles.sectionHeader}>
          <p>Termine</p>
          <h2>Bevorstehende Events</h2>
        </div>
        {upcomingEvents.length ? (
          <ul className={styles.eventsList}>
            {upcomingEvents.map((event) => (
              <li key={`${event.datetime}-${event.title}`} className={styles.eventCard}>
                <span className={styles.eventDate}>
                  {new Date(event.datetime).toLocaleString("de-DE", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </span>
                <span>{event.title}</span>
                <span>{event.location}</span>
                {event.url ? (
                  <a className="button ghost" href={event.url}>
                    Details
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aktuell sind keine Termine geplant. Trage dich in den Newsletter ein, um neue Daten zuerst zu erfahren.</p>
        )}
      </section>

      <section className={`container ${styles.section} ${styles.revealUp}`}>
        <div className={styles.newsletterCta}>
          <FloatingLeaves className={styles.newsletterLeaves} />
          <div className={styles.newsletterCopy}>
            <div className={styles.sectionHeader}>
              <p>Immer up to date</p>
              <h2>Newsletter abonnieren</h2>
            </div>
            <p>
              Exklusive Leseproben, Vorverkaufsankündigungen und Event-Tickets direkt in deinem Posteingang.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
