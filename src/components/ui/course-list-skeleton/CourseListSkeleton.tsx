import Skeleton from "@/components/ui/skeleton/Skeleton";

const CourseListSkeleton = () => {
  return (
    <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <li key={index} className="container-card">
          <Skeleton className="w-full h-50 !rounded-2xl" />

          <div className="flex flex-col gap-2 p-4">
            <Skeleton className="w-2/3 h-5" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />

            <Skeleton className="w-16 h-6 !rounded-full mt-1" />

            <Skeleton className="w-full h-11 !rounded-xl mt-4" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CourseListSkeleton;
