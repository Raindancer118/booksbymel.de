import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

type Cta = { label: string; href: string };

type StatChip = {
  label: string;
  value?: string;
};

type HeroSectionProps = {
  eyebrow?: string;
  headline: string;
  tagline: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  stats?: StatChip[];
  heroImage: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
};

export default function HeroSection({
  eyebrow,
  headline,
  tagline,
  primaryCta,
  secondaryCta,
  stats,
  heroImage,
}: HeroSectionProps) {
  return (
    <section className={`${styles.hero} container`}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.tagline}>{tagline}</p>
          <div className={styles.ctas}>
            <Link className="button" href={primaryCta.href}>
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link className="button ghost" href={secondaryCta.href}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
          {stats?.length ? (
            <ul className={styles.stats} aria-label="Highlights">
              {stats.map(stat => (
                <li key={`${stat.label}-${stat.value ?? ""}`} className={styles.statChip}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  {stat.value ? <span className={styles.statValue}>{stat.value}</span> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={`card ${styles.mediaCard}`}>
          <Image
            className={styles.media}
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width ?? 600}
            height={heroImage.height ?? 720}
            sizes="(max-width: 768px) 100vw, 540px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
