import Image from "next/image";
import FeatureGrid from "@/components/FeatureGrid";
import Seo from "@/components/Seo";
import styles from "./page.module.css";

const heroHighlights = [
  "Romane über verletzliche Stärke, weibliche Freundschaft und zweite Chancen",
  "Amazon-exklusive Bonuskapitel, Hörbuch-Extras und Live-Schreibsessions",
  "Lesungen in ganz Deutschland – von Wohnzimmer-Bookclubs bis Literaturfestivals",
];

const featureItems = [
  {
    eyebrow: "Erzählstimme",
    title: "Intim, atmosphärisch, nah",
    description:
      "Ich schreibe Geschichten, die nachklingen – mit viel Atmosphäre, emotionaler Tiefe und Charakteren, die ihre Narben zeigen dürfen.",
  },
  {
    eyebrow: "Recherche",
    title: "Detailverliebt und lebendig",
    description:
      "Für jeden Roman spreche ich mit Expertinnen, reise an Originalschauplätze und sammle Tagebucheinträge, bis jede Szene atmet.",
  },
  {
    eyebrow: "Community",
    title: "Dialog mit Leser*innen",
    description:
      "Newsletter, Live-Chats und Beta-Leser-Runden gehören zum Schreibprozess – Geschichten werden bei mir gemeinsam gefeiert.",
  },
  {
    eyebrow: "Arbeitsweise",
    title: "Strukturiert und frei zugleich",
    description:
      "Plotboards, Playlists und Mitternachts-Schreibsprints sorgen dafür, dass Inspiration und Handwerk Hand in Hand gehen.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "Ophelia erscheint exklusiv bei Amazon",
    description:
      "Ein Roman über Nähe und Grenzen – begleitet von einem Hörbuch, Bonuskapiteln und einer Amazon-Lesereise.",
  },
  {
    year: "2023",
    title: "Dark Romance »The Auctioned Bride«",
    description:
      "Mit Maeve und Damian beginnt meine Reise ins Dark-Romance-Genre – inklusive Amazon-Launch, Special-Edition-Box und Livestream-Lesung.",
  },
  {
    year: "2020",
    title: "Von Marketing zu Manuskript",
    description:
      "Nach Jahren in Content-Strategie und Storytelling-Agenturen konzentriere ich mich komplett auf eigene Figuren.",
  },
  {
    year: "2016",
    title: "Creative-Writing-Studium in Leipzig",
    description:
      "Seminare bei deutschsprachigen Autor*innen, erste Veröffentlichungen in Anthologien und literarischen Magazinen.",
  },
];

const quickFacts = [
  { label: "Wohnort", value: "Leipzig, Deutschland" },
  { label: "Lieblings-Plot-Trope", value: "Second Chances & Found Family" },
  { label: "Aktuelles Projekt", value: "»The Auctioned Bride« Bonuskapitel & Audiobook" },
  { label: "Vertretung", value: "Literaturagentur Abendstern" },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Über Mel",
    url: "https://booksbymel.de/ueber",
    description:
      "Kurz- und Langbio, Presseinfos sowie Einblicke in Arbeitsweise und Veröffentlichungen der Autorin Mel.",
    mainEntity: {
      "@type": "Person",
      name: "Mel",
      jobTitle: "Autorin",
      sameAs: [
        "https://booksbymel.de",
        "https://booksbymel.de/newsletter",
      ],
    },
  } as const;

  return (
    <main>
      <Seo
        title="Über"
        description="Langbio, Arbeitsweise und aktuelle Stationen von Autorin Mel."
        jsonLd={jsonLd}
        ogImage="/images/og/default.jpg"
      />

      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.heroEyebrow}>Autorin & Erzählerin</span>
              <h1 className={styles.heroHeadline}>
                Geschichten über Mut, Nähe und das Danach
              </h1>
              <p className={styles.heroTagline}>
                Ich bin Mel – Contemporary-Autorin mit einem Herz für komplexe Frauenfiguren,
                dichte Atmosphären und Geschichten, die noch lange nach dem letzten Kapitel
                weiterklingen.
              </p>
              <ul className={styles.heroHighlights}>
                {heroHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <figure className={styles.heroPortrait}>
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/portraits/portrait.webp"
                  alt="Mel – Autorenportrait"
                  fill
                  priority
                  sizes="(max-width: 768px) 70vw, 320px"
                />
              </div>
              <figcaption className={styles.portraitCaption}>Foto: Privat</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.bioSection}>
        <div className="container">
          <div className={styles.bioGrid}>
            <article className={styles.bioCard}>
              <h2>Langbio</h2>
              <p className={styles.bioLead}>
                Mel schreibt Contemporary-Romane, in denen verletzliche Stärke auf zarte
                Rebellion trifft.
              </p>
              <p className={styles.bioParagraph}>
                Aufgewachsen zwischen Küstennebel und Großstadtlaternen sammelt sie Schauplätze,
                die nach Salzluft, alten Plattenläden und flirrenden Sommernächten riechen. Nach
                Stationen in Kulturjournalismus, Marketing und Storytelling-Agenturen wagte Mel den
                Sprung in die Selbstständigkeit und verknüpft seitdem ihre Erfahrungen mit
                emotionaler Dramaturgie zu literarischen Welten.
              </p>
              <p className={styles.bioParagraph}>
                Ihre Leser*innen begleitet sie nicht nur durch vielschichtige Charakterstudien, sondern
                auch hinter die Kulissen: Schreibnächte auf Twitch, exklusive Newsletter-Schnipsel und
                intime Lesungen in Wohnzimmer-Bookclubs gehören genauso dazu wie Festivalbühnen und
                Podcast-Interviews.
              </p>
              <p className={styles.bioParagraph}>
                Wenn Mel nicht schreibt, findet man sie an ihrem liebsten Schreibplatz – einem alten
                Holztisch voller Plotkarten – oder unterwegs für Recherchereisen entlang vergessener
                Bahnstrecken. Dort lauscht sie den Geschichten anderer, die den Funken für ihre nächsten
                Romane liefern.
              </p>
            </article>
            <aside className={styles.factCard}>
              <h3>Schnelle Fakten</h3>
              <ul className={styles.factList}>
                {quickFacts.map((fact) => (
                  <li key={fact.label}>
                    <span className={styles.factLabel}>{fact.label}</span>
                    <span className={styles.factValue}>{fact.value}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className="container section">
          <div className={styles.featureIntro}>
            <span className={styles.heroEyebrow}>Arbeitsweise</span>
            <h2>So entstehen meine Geschichten</h2>
            <p>
              Schreiben ist für mich ein Dialog: zwischen mir und meinen Figuren, zwischen mir und
              meiner Community. Diese vier Säulen tragen jedes Manuskript – vom ersten Funken bis zum
              fertigen Buch.
            </p>
          </div>
          <FeatureGrid items={featureItems} />
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className="container section">
          <h2>Stationen</h2>
          <ol className={styles.timeline}>
            {milestones.map((milestone) => (
              <li key={milestone.year} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{milestone.year}</span>
                <div className={styles.timelineContent}>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.pressSection}>
        <div className="container">
          <div className={styles.pressCard}>
            <h2>Presse & Zusammenarbeit</h2>
            <p>
              Pressefotos, Buchcover und Faktenblätter sende ich gerne auf Anfrage zu. Für Interviews,
              Lesungen oder Kooperationsideen erreichst du mich direkt per E-Mail – gemeinsam finden wir
              die richtige Form.
            </p>
            <ul className={styles.pressLinks}>
              <li>
                <a className={styles.pressLink} href="mailto:kontakt@booksbymel.de">
                  kontakt@booksbymel.de
                </a>
              </li>
              <li>
                <a className={styles.pressLink} href="/newsletter">
                  Newsletter abonnieren
                </a>
              </li>
              <li>
                <a className={styles.pressLink} href="/events">
                  Aktuelle Termine
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
