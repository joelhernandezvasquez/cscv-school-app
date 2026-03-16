import Skeleton from '../skeleton/Skeleton';
import styles from './styles.module.css';

const TableSkeleton = () => {
  return (
    <div className={styles.wrapper}>
     
      <div className={styles.header}>
        <Skeleton className={styles.headerCell} />
        <Skeleton className={styles.headerCell} />
        <Skeleton className={styles.headerCell} />
        <Skeleton className={styles.headerCell} />
        <Skeleton className={styles.headerCell} />
      </div>

      {/* Rows */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.firstColumn}>
            <Skeleton className={styles.avatar} />
            <Skeleton className={styles.name} />
          </div>

          <Skeleton className={styles.cell} />
          <Skeleton className={styles.cell} />
          <Skeleton className={styles.cell} />
          <Skeleton className={styles.actions} />
        </div>
      ))}
    </div>
  )
}

export default TableSkeleton