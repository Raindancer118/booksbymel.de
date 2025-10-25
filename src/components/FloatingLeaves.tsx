import styles from "./FloatingLeaves.module.css";

type FloatingLeavesProps = {
  className?: string;
};

export default function FloatingLeaves({ className }: FloatingLeavesProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden="true">
      <span className={`${styles.leaf} ${styles.leafOne}`} />
      <span className={`${styles.leaf} ${styles.leafTwo}`} />
      <span className={`${styles.leaf} ${styles.leafThree}`} />
      <span className={`${styles.leaf} ${styles.leafFour}`} />
      <span className={`${styles.leaf} ${styles.leafFive}`} />
      <span className={`${styles.leaf} ${styles.leafSix}`} />
    </div>
  );
}
