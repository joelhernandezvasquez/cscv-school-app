
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
  _count:{Enrollments:number}
}

export interface StudentsPagination{
  totalPages:number,
  totalStudents:number;
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