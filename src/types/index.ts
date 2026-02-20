
export interface User{
    email:string,
    password:string,
    error:string
}
export type SessionUser = {
  name: string;
  email: string;
  image?: string;
  role: string;
};
export interface UserSession{
    user: {
      id: number,
      name: string,
      email:string,
      role: string,
      created_at: Date
    },
    token: string,
    id: string,
   expires: Date,
   expiresAt:number
}

export type LoginError = {
 isError:boolean,
 message?:string
}
export interface StudentsSummary{
    total:number,
    active:number,
    inactive:number
}

export interface Students{
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  gender: string,
  direccion:string,
  parroquia: string,
  asuntos_medicos: string,
  active: boolean,
  created_at: Date,
  _count:{StudentCourses:number},
  error?:string | boolean
}

export interface PaginationData{
  totalPages:number,
  totalCount:number;
}

export interface AddStudentFormState {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean,
    phoneNumber?: boolean;
    gender?: boolean;
    active?:boolean;
    street?: boolean;
    city?: boolean;
    state?: boolean;
    zipcode?: boolean;
    parroquia?: boolean;
    medicalCondition?: boolean;
    success:boolean,
    message:string,
    errors?: Record<string, string>;
}

export interface DeleteStudentForm{
  success:boolean,
  message:string,
}

export type CoursesTakenByLevel = {
  colorLevel?:string,
  level: string,
  courseLevelQuantity: number,
  coursesCompleted: number
}

export interface StudentProgress {
   totalCourses: number,
   totalCoursesTaken: number,
   coursesTakenByLevel: CoursesTakenByLevel []
}

export interface PendingCourses {
   id:number,
   name: string,
   description: string,
   level: string,
}
export interface CompletedCourse{
  name:string,
  description:string,
  level:string,
  completeAt: null | Date
}

export interface AddPendingCourses {
     id:number,
     name:string,
     description:string,
     level:string,
     complete:boolean
     date?:Date | null
}
export interface CourseIds{
  course_id: number;
}

export interface EventsSummary{
    total:number,
    upcoming:number,
    completed:number
}

export interface Events {
        id: number;
        name: string;
        course_id: number;
        created_at: Date;
        status: string;
        price: number;
        start_date: Date;
        end_date: Date;
        location: string;
}
export interface EventItem{
        id: number;
        name: string;
        course_id: number;
        created_at: Date;
        status: string;
        price: number;
        start_date: Date;
        end_date: Date;
        course:{
          level:string,
          name:string
        },
         enrollmentCount: number,
         error?:string | boolean     
}

export interface Courses{
  id: number,
  name: string,
  description: string,
  level: string
}

export interface AddEventFormState {
    name?: string,
    course?: string,
    price?: number,
    status?: string,
    date?: Date,
    success:boolean,
    message:string,
    errors?: Record<string, string>;
}

export interface UpdateEventFormState {
    id?:string,
    name?: string,
    course?: string,
    price?: number,
    status?: string,
    date?: Date,
    success:boolean,
    message:string,
    errors?: Record<string, string>;
}

export interface EnrollmentEvent{
  enrollmentId:string,
  studentId: number,
  fullName: string,
  phone: string,
  email: string,
  enrollmentDate: Date,
  courseTitle: string,
  status: string,
  success?: boolean,
  message?: string,
}


export interface DashboardEventSummary{
      upcomingEvents:{
           events:Events[],
           amount:number,
           nextEventInDays:number
         },
         activeEvents:{
          events:Events[],
          amount:number
         },
         pendingCompletionEvents:{
          events:Events[],
          amount:number
         }
       }

       export interface StudentNoCourse{
         id: number, 
         first_name: string, 
         last_name: string
       }

       export interface EnrollmentStudent{
        enrolled_at: Date,
        event_id:number,
        id:string,
        status:string,
        student_id:number
      }

  export interface DashboardStudentRisk{
    studentsNoCourse: StudentNoCourse[],
    studentsPastEnrollment: {
      id: number,
      first_name: string,
      last_name: string,
      Enrollments: EnrollmentStudent[]
    }[]
  }
