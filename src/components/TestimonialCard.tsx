import styles from "./TestimonialCard.module.css";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role?: string;
};

export default function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <figure className={styles.card}>
      <blockquote className={styles.quote}>{quote}</blockquote>
      <figcaption className={styles.source}>
        <span className={styles.name}>{name}</span>
        {role ? <span className={styles.role}>{role}</span> : null}
      </figcaption>
    </figure>
  );
}
