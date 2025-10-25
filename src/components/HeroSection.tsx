import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import styles from "./HeroSection.module.css";

type Cta = { label: string; href: Route<string> };

type HeroSectionProps = {
  headline: string;
  tagline: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  heroImage: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
};

export default function HeroSection({
  headline,
  tagline,
  primaryCta,
  secondaryCta,
  heroImage,
}: HeroSectionProps) {
  return (
    <section className={`${styles.hero} container`}>
      <div className={styles.layout}>
        <div className={styles.copy}>
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
