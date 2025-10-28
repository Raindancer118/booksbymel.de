import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import BookCard from "@/components/BookCard";
import NewsletterForm from "@/components/NewsletterForm";
import Seo from "@/components/Seo";
import EventList from "@/components/EventList";
import { getBooks } from "@/lib/books";
import { getEvents } from "@/lib/events";
import styles from "./page.module.css";

export default function HomePage() {
  const books = getBooks();
  const featuredBooks = books.slice(0, 4);
  const events = getEvents();
  const upcomingEvents = events.slice(0, 3);

  const amazonRetailer = featuredBooks[0]?.retailers?.find(retailer =>
    retailer.name.toLowerCase().includes("amazon"),
  );
  const amazonBuyLink =
    amazonRetailer?.url ?? featuredBooks[0]?.retailers?.[0]?.url ?? "#";

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

  const amazonExperience = [
    {
      title: "Prime Versand",
      description:
        "Bestellt und in ein bis zwei Werktagen bei dir – perfekt für Lesenächte, die nicht warten wollen.",
    },
    {
      title: "Kindle & Hörbuch",
      description:
        "Egal ob E-Ink oder Kopfhörer: Kindle, Audible und Alexa liefern dir Ophelia noch in derselben Minute.",
    },
    {
      title: "Exklusive Extras",
      description:
        "Auf Amazon teile ich Bonuskapitel, Behind-the-Scenes und kleine Sprachnachrichten direkt nach Release.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Amazon liefert Ophelia so schnell, dass unsere Leserunde schon vor dem Wochenende startklar war.",
      name: "Clara Feldmann",
      role: "Literaturbloggerin, Kapitelweise",
    },
    {
      quote: "Das Kindle-E-Book war Sekunden nach dem Kauf da – und das Hörbuch begleitet mich zur Arbeit.",
      name: "Jonas Berger",
      role: "Rezensent, BücherAtlas",
    },
    {
      quote:
        "Mels Bonusmaterial auf Amazon fühlt sich an, als würde sie persönlich neben mir auf dem Sofa sitzen.",
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
        eyebrow="Amazon exklusiv"
        headline="Ophelia zuerst bei Amazon – direkt aus meiner Schreibnacht"
        tagline="Ich lasse dich via Prime, Kindle und Hörbuch sofort eintauchen – kein Warten, nur Herzklopfen."
        primaryCta={{ label: "Jetzt bei Amazon bestellen", href: amazonBuyLink }}
        secondaryCta={{ label: "Newsletter", href: "/newsletter" }}
        stats={[
          { label: "Prime Versand", value: "1–2 Werktage" },
          { label: "Kindle & Hörbuch", value: "zeitgleich" },
          { label: "Bonusinhalte", value: "Amazon Library" },
        ]}
        heroImage={{
          src: "/images/covers/Ophelia.jpg",
          alt: "Buchcover von Ophelia",
          width: 640,
          height: 800,
        }}
      />

      <section className={`container ${styles.section}`}>
        <div className={styles.split}>
          <div className={styles.spotlightImageWrapper}>
            <Image
              src="/images/textures/paper.jpg"
              alt="Stimmungsvolles Stillleben mit Kaffee, Notizbuch und Ophelia-Cover"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <div className={styles.amazonContent}>
            <span className={styles.kicker}>Amazon Erlebnis</span>
            <h2>So fühlt sich Ophelia bei Amazon an</h2>
            <p>
              Wenn ich ein neues Kapitel freigebe, soll es ohne Umwege bei dir landen. Amazon bündelt Versand,
              Kindle, Hörbuch und Bonusmaterial, damit du mit mir durch die Nachtgärten streifen kannst, sobald du
              klickst.
            </p>
            <ul className={styles.bulletList}>
              {amazonExperience.map((feature) => (
                <li key={feature.title} className={styles.bulletItem}>
                  <span className={styles.bulletIcon} aria-hidden>
                    •
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
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

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <p>Leserstimmen</p>
          <h2>Was andere sagen</h2>
        </div>
        <ul className={styles.testimonialList}>
          {testimonials.map((testimonial) => (
            <li key={testimonial.name} className={styles.testimonialCard}>
              <blockquote>„{testimonial.quote}“</blockquote>
              <p className={styles.testimonialMeta}>
                {testimonial.name}
                {testimonial.role ? <span> · {testimonial.role}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <p>Termine</p>
          <h2>Bevorstehende Events</h2>
        </div>
        <EventList />
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.newsletterCta}>
          <div className={styles.newsletterCopy}>
            <span className={styles.kicker}>Immer up to date</span>
            <h2>Newsletter abonnieren</h2>
            <p>
              Hinter den Kulissen, Vorverkaufs-Codes und kleine Schreib-Updates direkt aus meinem Studio. Kein Spam,
              nur Geschichten.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
