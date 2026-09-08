import Skeleton from "@/components/ui/skeleton/Skeleton";

const CourseCategorySkeleton = () => {
  return (
    <section className="bg-white px-2 py-4 rounded-2xl shadow-[0_2px_6px_#90929433]">
      <h2 className="title">Courses By Category</h2>

      <div>
        <div className="mx-auto aspect-square max-h-[270px] flex items-center justify-center py-6">
          <Skeleton className="!rounded-full w-[190px] h-[190px]" />
        </div>

        <ul className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 !rounded-[3px]" />
                <Skeleton className="w-20 h-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-16 h-3.5" />
                <Skeleton className="w-8 h-3.5" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CourseCategorySkeleton;
