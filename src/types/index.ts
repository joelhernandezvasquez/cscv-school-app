
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
   expires: Date
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