import StatCardSkeleton from "@/components/ui/stat-card-skeleton/StatCardSkeleton"
import style from './style.module.css';

const GridStatSkeleton = () => {
  return (
    <section className={style.grid}>
         <StatCardSkeleton/>
         <StatCardSkeleton/>
         <StatCardSkeleton/>
    </section>
  )
}

export default GridStatSkeleton