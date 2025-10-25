import type { ReactNode } from "react";
import styles from "./FeatureGrid.module.css";

type FeatureItem = {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: ReactNode;
};

type FeatureGridProps = {
  items: FeatureItem[];
  className?: string;
};

export default function FeatureGrid({ items, className }: FeatureGridProps) {
  return (
    <div className={`${styles.grid} ${className ?? ""}`.trim()}>
      {items.map((item, index) => (
        <article key={index} className={styles.item}>
          {item.eyebrow ? <span className={styles.eyebrow}>{item.eyebrow}</span> : null}
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
          {item.icon}
        </article>
      ))}
    </div>
  );
}
