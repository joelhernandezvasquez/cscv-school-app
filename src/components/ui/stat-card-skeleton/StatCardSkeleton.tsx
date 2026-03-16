import Skeleton from "../skeleton/Skeleton";
import styles from "./styles.module.css"

export default function StatCardSkeleton() {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.icon} />
      <div className={styles.content}>
        <Skeleton className={styles.title} />
        <Skeleton className={styles.value} />
      </div>
    </div>
  );
}
