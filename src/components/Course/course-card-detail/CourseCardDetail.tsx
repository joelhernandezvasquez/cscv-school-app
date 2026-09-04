import Link from "next/link";
import Image from "next/image";
import CourseLevelPill from "@/components/ui/course-level-pill/CourseLevelPill";
import { formatCourseLevel, getImageUrl } from "@/lib/utils";
import { Courses } from "@/types";

interface Props{
    course:Courses
}

const CourseCardDetail = ({course}:Props) => {
  const {name,description,level,image_url} = course;
  const courseLevel = formatCourseLevel(level);

  return (
    <li className="container-card">
         
         { image_url 
         
          ?
              <div className="relative w-full h-50 rounded-2xl overflow-hidden">
                <Image
                  className="object-cover object-center"
                  src={getImageUrl(image_url)}
                  alt={name}
                  fill
                />
              </div>
              :
               <div className="bg-[#e2e2e3] w-full h-50 rounded-2xl"></div>

          }
         
         <div className="flex flex-col gap-2 p-4">
             <h3 className="text-lg text-[#2e3135] font-semibold">{name}</h3>
             <p className="text-[#2e3135] text-md">{description}</p>
  
            <div className='w-fit'>
                 <CourseLevelPill level={courseLevel}/>
            </div>
            
           <Link href={'/'} className="primary-button block mt-4"> See Course Details </Link>

         </div>
         
    </li>
  )
}

export default CourseCardDetail