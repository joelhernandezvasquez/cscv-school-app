import { getCoursesByLevel } from "@/lib/actions/courses"
import { CoursePieChart } from "../course-pie-chart/CoursePieChart"
import CourseCategoryPercentange from "@/components/ui/course-category-percentage/CourseCategoryPercentange"
import { formatCoursesByLevelToChartData } from "@/lib/utils"

const CourseCategory = async() => {
  const coursesByLevel = await getCoursesByLevel();
  const chartData = formatCoursesByLevelToChartData(coursesByLevel);
  const totalCourses = chartData.reduce((acc, course) => acc + course.visitors, 0);

  return (
    <section className="bg-white px-2 py-4 rounded-2xl shadow-[0_2px_6px_#90929433]">
        <h2 className="title">Courses By Category</h2>

         <div>
           <CoursePieChart chartData={chartData}/>
           <ul className="flex flex-col gap-4">
            {chartData.map((data,index)=>{
             return <li key={index}>
                    <CourseCategoryPercentange 
                      key={index}
                      colorLevel={data.fill} 
                      level={data.browser} 
                      courseLevelQuantity={data.visitors} 
                      totalCourses={totalCourses}                  
                    />
             </li> 
            })}
             
           </ul>
          
        </div>
    </section>
  )
}

export default CourseCategory
