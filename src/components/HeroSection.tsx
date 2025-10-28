import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import styles from "./HeroSection.module.css";

type LinkHref = ComponentPropsWithoutRef<typeof Link>["href"];

type Cta = { label: string; href: LinkHref | string };

function isInternalHref(href: Cta["href"]): href is LinkHref {
  if(typeof href === "string"){
    return href.startsWith("/");
  }
  return true;
}

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
  const renderCta = (cta: Cta, className: string) => {
    if(isInternalHref(cta.href)){
      return (
        <Link className={className} href={cta.href}>
          {cta.label}
        </Link>
      );
    }

    return (
      <a className={className} href={cta.href}>
        {cta.label}
      </a>
    );
  };

  return (
    <section className={`${styles.hero} container`}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.tagline}>{tagline}</p>
          <div className={styles.ctas}>
            {renderCta(primaryCta, "button")}
            {secondaryCta ? renderCta(secondaryCta, "button button--ghost") : null}
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
        <div className={styles.media}>
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width ?? 600}
            height={heroImage.height ?? 720}
            sizes="(max-width: 768px) 100vw, 480px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
