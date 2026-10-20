import Skeleton from '../skeleton/Skeleton';
import styles from './styles.module.css';

interface Props {
  columns?: 4 | 5;
}

const TableSkeleton = ({ columns = 5 }: Props) => {
  const gridStyle =
    columns === 4 ? { gridTemplateColumns: '2fr 1fr 1fr 110px' } : undefined;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} style={gridStyle}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className={styles.headerCell} />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.row} style={gridStyle}>
          <div className={styles.firstColumn}>
            <Skeleton className={styles.avatar} />
            <Skeleton className={styles.name} />
          </div>

          {Array.from({ length: columns - 2 }).map((_, cellIndex) => (
            <Skeleton key={cellIndex} className={styles.cell} />
          ))}
          <Skeleton className={styles.actions} />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
