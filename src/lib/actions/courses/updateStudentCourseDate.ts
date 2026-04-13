'use server';

import { CompletedCourseActionState} from "@/types";
import { getValidatedToken } from "..";

export const updateStudentCourseDate = async (
  previousState: CompletedCourseActionState,
  formData: FormData,
): Promise<CompletedCourseActionState> => {

 const courseId = formData.get('course-id');
 const studentId = formData.get('student-id');
 const courseDate = JSON.parse(formData.get('courseDate') as string);

 
  try {
   const token = await getValidatedToken();
       
    const request = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/student/${studentId}/update-student-course-date`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          course_id:parseInt(courseId?.toString() as string),
          completedAt:courseDate?.to.toString(),
      })
    });

    if (!request.ok) {
      console.log(request);
      return {
        success: false,
        message: `Server error: ${request.statusText}`
      };
    }

    const response = await request.json();
    if (response) {
      return {
        success: true,
        message: 'Date has been updated.'
      };
    }
    
    return {
      success: false,
      message: 'No data returned from server'
    };
      
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'An unexpected error occurred'
    };
  }
};
